
import React from "react"
import Card from "./darn/card"

const suits = ['clubs', 'hearts', 'diamonds', 'spades'];

const rand = (a,b) => Math.floor((Math.random() * b) + a);
const randomCard = () => rand(1, 13);
const randomSuite = () => suits[rand(0, 3)];

const Home = props => {
  return (
    <div>
      <h2 className="header">Home</h2>
      <p>A random poker hand (not necessarily unique).</p>
      <Card suit={randomSuite()} value={randomCard()} />
      <Card suit={randomSuite()} value={randomCard()} />
      <Card suit={randomSuite()} value={randomCard()} />
      <Card suit={randomSuite()} value={randomCard()} />
      <Card suit={randomSuite()} value={randomCard()} />
    </div>
  )
}

export default Home
