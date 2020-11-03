import React from "react"
import { NodeGroup } from "react-move";
import NumberPicker from 'react-widgets/lib/NumberPicker'
// this import is not bringing in the expected styles????
import 'react-widgets/dist/css/react-widgets.css';

import Card from "../darn/card"

import "./HomePage.scss"

class HomePage extends React.Component {

  cardWidth = 50;
  cardHeight = 3.5 * this.cardWidth / 2.5;

  tableMargin = 10;
  tableWidth = 600;
  tableWidthCenter = this.tableWidth / 2;

  tableHeight = 2.5 * this.tableWidth / 3;
  tableHeightCenter = this.tableHeight / 2;

  centerWidth = 180;
  centerHeight = 60;

  homeStartingTop = this.tableHeight - this.cardHeight - 2 * this.tableMargin;

  constructor(...args) {
    super(...args)
    const cardCount = 5;
    this.state = { 
      otherPlayersCount: 3,
      cards: [...Array(cardCount).keys()].map(n =>
        ({ id: n, suit: "spades", value: 8+n, place: 0 }),
      )
    }
  }

  handleClick = (card) => {
    console.log("*** CLICK =", card.value, card.place);
    const cards = this.state.cards;
    const n = cards.indexOf(card);
    const newPlace = (card.place+1) % 3;
    cards[n].place = newPlace;
    this.setState({ cards });
    console.log("handle click - new place", newPlace);
  }

  moveTo = (n, m) => {
    console.log("move to", n, m);
  }

  render() {

    const { otherPlayersCount } = this.state;

    const playerPosition = (n, m) => {
      // calculate the position of player N of M at the table
      const leftPos = (top, left) => ({ position: 'absolute', top: top + 'px', left: left + 'px'});
      const rightPos = (top, right) => ({ position: 'absolute', top: top + 'px', right: right + 'px'});
      switch(n) {
        case 1: return leftPos(this.tableHeightCenter - this.cardHeight / 2, this.tableMargin);
        case m: return rightPos(this.tableHeightCenter - this.cardHeight / 2, this.tableMargin);
        default: 
          const topPlayers = m - 2;
          const width = this.tableWidth - 2 * this.tableMargin;
          const spacing = width / (topPlayers + 1);
          return leftPos(this.tableMargin, this.tableMargin + spacing * (n-1) - this.cardWidth / 2);
      }
    };

    const calcCardPosition = (card) => {
      if (card.place === 2) {
        return {top: -140, left: 20, angle: 10};
      }

      const n = this.state.cards.indexOf(card);

      let angle = 0;
      let top = [0, -20][card.place];
      let left = [0, 6][card.place];

      for( let i=0; i<n; i++ ){
        const s = 3*Math.sin(angle/180);
        const c = 3*Math.cos(angle/180);
        top += Math.round(s - c);
        left += Math.round(s + c);
        angle += 7; // degrees
      }
      return {left, top, angle};
    }

    let playerNumbers = Array.from({length: otherPlayersCount}, (_, i) => i + 1);

    let centerPos = {
      position: "absolute",
      top: this.tableHeightCenter - this.centerHeight / 2,
      left: this.tableWidthCenter - this.centerWidth / 2,
      width: this.centerWidth,
      height: this.centerHeight,
      border: "1px solid #73AD21",
    }

    const cardStyle = (card) => {
      const speed = 0.1;
      const {left, top, angle} = calcCardPosition(card);
      if( card.value === 10 ) console.log("place, angle", card.place, angle);
      return { 
        top, left,
        transformOrigin: 'bottom left',
        transform: `rotate(${angle}deg)`,
        transition: `top ${speed}s, left ${speed}s`
      };
    }

    return (

      <div>
        <h2 className="header">Table Layout Experiment</h2>
        <p>The cards are just placholders to explore positioning stuff at the edges and center of the green table.</p>
        Select 3 to 7 Other Players : <NumberPicker
          max={7} min={3}
          value={otherPlayersCount}
          onChange={value => this.setState({ otherPlayersCount: value })}
        />
        <div className="border table-container" style={{width: this.tableWidth, height: this.tableHeight}}>

          <div style={centerPos}>center</div>

          <div className="play-area">
              <NodeGroup
                data={this.state.cards}
                keyAccessor={data => `item-key-${data.id}`}
                start={data => ({...cardStyle(data)})}
                update={data => ({...cardStyle(data), transition: `top 0.5s, left 0.5s`})}
              >
                {nodes => (
                  <div className="hand">
                    {nodes.map(({ key, data, state }) => {
                      // console.log("*** map", key);
                      // console.log("data", data);
                      // console.log("state", state);
                      // console.log("style", cardStyle(data));
                      const style = cardStyle(data);
                      return (
                        <div key={key} className="card-holder" style={{...style}}>
                          <Card size="small" 
                            suit={data.suit} value={data.value}
                            onClick={() => this.handleClick(data)}/>
                        </div>
                      )
                    })}
                  </div>
                )}
              </NodeGroup>
          </div>

          {playerNumbers.map(n => {
            return (
              <div key={n+2} style={playerPosition(n, otherPlayersCount)} >
                <Card suit='clubs' value={n+2} size={this.cardWidth} onClick={() => this.moveTo(n, otherPlayersCount)} />
              </div>
            )
          })}

          <div className="content left-content">
            There are {otherPlayersCount+1} players.
          </div>

          <div className="content right-content">
            some right content
          </div>

        </div>
      </div>
    )
  }
}

export default HomePage
