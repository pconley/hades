import React from "react"
import Card from "../darn/card"
import "./HomePage.scss"

const Home = props => {

  const cardWidth = 75; // medium
  const cardHeight = 3.5 * cardWidth / 2.5; // medium
  const width = 600;
  const middle = width / 2;
  const height = 400;
  const center = height / 2 - cardHeight / 2;

  const position = (n, m) => {
    // calculate player;s position n of m at the table
    const leftPos = (top, left) => ({ position: 'absolute', top: top + 'px', left: left + 'px'});
    const rightPos = (top, right) => ({ position: 'absolute', top: top + 'px', right: right + 'px'});
    switch(n) {
      case 1: return leftPos(center, 0);
      case m: return rightPos(center, 0);
      default: 
        const topPlayers = m - 2;
        const spacing = width / (topPlayers + 1);
        console.log("spacing", n, spacing, n*spacing);
        return leftPos(0, spacing * (n-1) - cardWidth / 2); // FIXME
    }
  };

  const count = 5; // number of other players
  const playerNumbers = Array.from({length: count}, (_, i) => i + 1)

  return (
    <div>
      <h2 className="header">Table Layout Experiment</h2>
      <div className="border table-container">
        <div className="table-center">
          <Card key="center" suit='spades' value="1" size="medium" />
        </div>

        <div key="me" className="table-home">
          <Card suit='hearts' value="13" size="medium" />
        </div>

        {playerNumbers.map(n => {
          return (
            <div key={n+2} style={position(n, count)}>
              <Card suit='clubs' value={n+2} size="medium" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
