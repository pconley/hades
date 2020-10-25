import React from 'react';
import Card from "../darn/card"
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import uuid from "uuid"
import axios from "axios"

const suits = ['hearts', 'clubs', 'diamonds', 'spades'];

const toNumber = ({suit, value}) => {
  const s = suits.indexOf(suit);
  const v = value === 1 ? 14 : value; // ace is big
  return 100 * s + v;
}

function compare(a, b) {
  return toNumber(b) - toNumber(a);
}

const contains = (cards, card) => cards.some(c => toNumber(c) === toNumber(card))

function deal(count) {
  const rand = (a,b) => Math.floor((Math.random() * b) + a);
  const randomValue = () => rand(1, 13);
  const randomSuit = () => suits[rand(1, 4) - 1];
  const cards = [];
  for( let i=0; i<count; i++ ){
    let card = null;
    while (card === null || contains(cards, card)) {
      card = { suit: randomSuit(), value: randomValue() };
    }
    cards.push(card);
  }
  return cards.sort(compare).map(({suit, value}) => ({ id: uuid.v4(), suit, value }));
}

class PlayingCardsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      poker: deal(5),
      bigHand: deal(13),
      remoteCards: [],
      remoteStatus: null,
    };
  }

  dealCards(step) {
    this.setState({ ...this.state, poker: deal(5), bigHand: deal(13) });
  }

  getHand() {
    const url = 'http://ppe-cardgameserver.southcentralus.azurecontainer.io:8000/hand';

    const toSuit = (x) => {
      switch(x) {
        case "Spades": return 'spades';
        case "Diamonds": return 'diamonds';
        case "Hearts": return 'hearts';
        default: return 'clubs';
      }
    }

    axios
    .get(url)
    .then(response => {
      console.log("hand response", response);
      const cards = response.data.hand.map(card => ({id: uuid.v4(), suit: toSuit(card.suit), value: card.rank }))
      console.log("fetched cards", cards);
      this.setState({ ...this.state, remoteCards: cards.sort(compare), remoteStatus: 'done' });
    })
    .catch(error => {
      let message;
      if (error.response) {
        message = `Request made and server responded ${error.response?.status}`;
      } else if (error.request) {
        message = "The request was made but no response was received";
      } else {
        message = "Something happened in setting up the request that triggered an Error";
      }
      console.warn(message);
      console.warn(error.message);
      console.warn("--data", error.response?.data);
      console.warn("--status", error.response?.status);
      console.warn("--headers", error.response?.headers);
      this.setState({ ...this.state, remoteStatus: message });
    })
    this.setState({ ...this.state, remoteCards: [], remoteStatus: 'loading' });
  }

  showStatus = (status) => {
    switch(status){
      case null : return null;
      case 'done' : return null;
      case 'loading' : return <Spinner animation="border" />;
      default: return <p>Error: {status}</p>;
    }
  }

  render() {
    console.log("state", this.state);
    const { poker, bigHand, remoteCards } = this.state;
    return (
    <div>
      <h2 className="header">Card Images</h2>

      <Button onClick={() => this.dealCards()}>Deal</Button>
      <p className="pt-2">A random poker hand. Just as a place to practice image display.</p>
      {poker.map(card => <Card key={card.id} suit={card.suit} value={card.value} />)}
      <p className="pt-2">A random big hand. Just as a place to practice sizing and sorting.</p>
      {bigHand.map(card => <Card key={card.id} suit={card.suit} value={card.value} size="small" />)}

      <br />
      <Button className="mt-4" onClick={() => this.getHand()}>Fetch</Button>
      <p className="pt-2">the hand fetched from the server.</p>
      {remoteCards.map(card => <Card key={card.id} suit={card.suit} value={card.value} size="medium" />)}
      {this.showStatus(this.state.remoteStatus)}
    </div>
    );
  }
}

export default PlayingCardsPage
