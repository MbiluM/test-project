import React from 'react';

function Card({ sneaker }) {
  return (
    <div className="card">
      <img src={sneaker.image} alt={sneaker.title} className="sneaker-image" />
      <h3>{sneaker.title}</h3>
      <p>${sneaker.price || sneaker.title}</p>
    </div>
  );
}

export default Card;