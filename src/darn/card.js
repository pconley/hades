import React from 'react';
import cards from './cards';

const cardStyle = (degrees) => {
  return {
    transformOrigin: 'bottom left',
    transform: `rotate(${degrees}deg)`
  }
}

const Card = props => {
  const { size, spot } = props;
  const angle = spot?.angle || 0;
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
  return <img 
    style={cardStyle(angle)} alt="" 
    src={src} width={width} height={height}
    onClick={props.onClick}
  />;
}

export default Card;