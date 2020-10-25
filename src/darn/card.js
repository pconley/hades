import React from 'react';
import cards from './cards';

const Card = props => {
  const { size } = props;
  const sizes = {small: 60, medium: 75, large: 100};
  let width = size || 100;
  if (typeof size === 'string' || size instanceof String) {
    if (size in sizes) {
      width = sizes[size];
    }
  }
  // playing card size : 2.5in x 3.5in
  const height = 3.5 * width / 2.5;
  const src = cards[props.suit][props.value];
  return <img src={src} width={width} height={height} alt="" />;
}

export default Card;