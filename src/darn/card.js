import React from 'react';
import cards from './cards';

const Card = props => {
  const width = props.size === 'small' ? 60 : 100;
  // playing card size : 2.5in x 3.5in
  const height = 3.5 * width / 2.5;
  const src = cards[props.suit][props.value];
  return <img src={src}  width={width} height={height} alt="Ace of Hearts" />;
}

export default Card;