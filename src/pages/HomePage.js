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

  tableHeight = 2 * this.tableWidth / 3;
  tableHeightCenter = this.tableHeight / 2;

  centerWidth = 180;
  centerHeight = 60;

  homeStartingTop = this.tableHeight - this.cardHeight - 2 * this.tableMargin;

  constructor(...args) {
    super(...args)
    const cardCount = 3;
    this.state = { 
      count: 3,
      home: 10,
      homePos: { 
        top: this.tableHeight - this.cardHeight,
        left: this.tableWidthCenter - this.cardWidth / 2
      },
      cards: [...Array(cardCount).keys()].map(n =>
        ({ id: 100*(n+1), suit: "spades", value: 10+n, top: this.homeStartingTop, left: 240 + n*40 }),
      )
    }
  }



  handleClick = (info) => {
    console.log("*** handle click info =", info);
    console.log("    state.cards =", this.state.cards);
    const { n } = info;
    const cards = this.state.cards;
    const card = this.state.cards[n];
    const newTop = card.top === this.homeStartingTop ? 200 : this.homeStartingTop;
    cards[n].top = newTop;
    this.setState({ cards });
    console.log("handle click - after", newTop);

  }

  moveTo = (n, m) => {
    console.log("move to", n, m);
  }

  render() {

    console.log("rendering");

    const { count } = this.state;

    const position = (n, m) => {
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


    let playerNumbers = Array.from({length: count}, (_, i) => i + 1);

    let centerPos = {
      position: "absolute",
      top: this.tableHeightCenter - this.centerHeight / 2,
      left: this.tableWidthCenter - this.centerWidth / 2,
      width: this.centerWidth,
      height: this.centerHeight,
      border: "1px solid #73AD21",
    }

    const speed = 0.5;

    return (

      <div>
        <h2 className="header">Table Layout Experiment</h2>
        <p>The cards are just placholders to explore positioning stuff at the edges and center of the green table.</p>
        Select 3 to 7 Other Players : <NumberPicker
          max={7} min={3}
          value={count}
          onChange={value => this.setState({ count: value })}
        />
        <div className="border table-container" style={{width: this.tableWidth, height: this.tableHeight}}>

          <div style={centerPos}>center</div>

          <NodeGroup
            data={this.state.cards}
            keyAccessor={d => `item-key-${d.id}`}
            start={d => {
              const n = this.state.cards.indexOf(d);
              console.log("start", d, n);
              return { n, top: 200, left: 200 + 40 * n};
            }}
            update={d => {
              const n = this.state.cards.indexOf(d);
              console.log("update", d, n);
              return { n, top: 300, left: 200 + 40 * n};
            }}
          >
            {nodes => (
              <div className="list">
                {nodes.map(({ key, data, state }) => {
                  console.log("--- map", key);  
                  console.log("    data", data);  
                  console.log("    state", state);  
                  return (
                    <div key={key} className="table-home" 
                      style={{...data, transition: `top ${speed}s, left ${speed}s`}}
                      onClick={() => this.handleClick(state)}
                    >
                      <Card suit={data.suit} value={data.value} size="small" />
                    </div>
                  )
                })}
              </div>
            )}
          </NodeGroup>


          {playerNumbers.map(n => {
            return (
              <div key={n+2} 
                style={position(n, count)} 
                onClick={() => this.moveTo(n, count)}
              >
                <Card suit='clubs' value={n+2} size={this.cardWidth} />
              </div>
            )
          })}

          <div className="content left-content">
            There are {count} players.
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
