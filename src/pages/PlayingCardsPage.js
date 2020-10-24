import React from 'react';
import Card from "../darn/card"
import Button from 'react-bootstrap/Button';

import uuid from "uuid"
import axios from "axios"

const suits = ['hearts', 'clubs', 'diamonds', 'spades'];

const toNumber = ({suit, value}) => {
  const v = value === 1 ? 14 : value; // ace is big
  return 100 * suit + v;
}

function compare(a, b) {
  return toNumber(b) - toNumber(a);
}

const contains = (cards, card) => cards.some(c => toNumber(c) === toNumber(card))

function deal(count) {
  const rand = (a,b) => Math.floor((Math.random() * b) + a);
  const randomValue = () => rand(1, 13);
  const randomSuit = () => rand(1, 4) - 1;
  const cards = [];
  const cardNumbers = [];
  for( let i=0; i<count; i++ ){
    let card = null;
    while (card === null || contains(cards, card)) {
      if( card ) console.log("was dup", card);
      card = { suit: randomSuit(), value: randomValue() };
    }
    cards.push(card);
  }
  const sorted = cards.sort(compare);
  return sorted.map(card => ({ id: uuid.v4(), suit: suits[card.suit], value: card.value }));
}

class PlayingCardsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      poker: deal(5),
      bigHand: deal(13),
      remote: [],
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
      console.log("cards", cards);
      this.setState({ ...this.state, remote: cards });
    })
    .catch(function (error) {
      if (error.response) {
        console.log("Request made and server responded");
        console.log("--data", error.response.data);
        console.log("--status", error.response.status);
        console.log("--headers", error.response.headers);
      } else if (error.request) {
        console.log("The request was made but no response was received");
        console.log(error.request);
      } else {
        console.log("Something happened in setting up the request that triggered an Error");
        console.log('Error', error.message);
      }
    });
  }

  render() {
    console.log("state", this.state);
    const { poker, bigHand, remote } = this.state;
    return (
    <div>
      <h2 className="header">Card Images</h2>
      <Button onClick={() => this.dealCards()}>Deal</Button>
      <Button onClick={() => this.getHand()}>Fetch</Button>
      <p className="pt-2">A random poker hand. Just as a place to practice image display.</p>
      {poker.map(card => <Card key={card.id} suit={card.suit} value={card.value} />)}
      <p className="pt-2">A random big hand. Just as a place to practice sizing and sorting.</p>
      {bigHand.map(card => <Card key={card.id} suit={card.suit} value={card.value} size="small" />)}
      <p className="pt-2">the hand fetched from the server.</p>
      {remote.map(card => <Card key={card.id} suit={card.suit} value={card.value} size="small" />)}
    </div>
    );
  }
}

export default PlayingCardsPage
