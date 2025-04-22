import React from 'react'; // Import React

// Card component to display individual product details
function Card({ sneaker }) {
  return (
    <div className="card">
      {/* Display the product image */}
      <img src={sneaker.image} alt={sneaker.title} className="sneaker-image" />
      {/* Display the product title */}
      <h3>{sneaker.title}</h3>
      {/* Display the product price or fallback to the title if the price is unavailable */}
      <p>${sneaker.price || sneaker.title}</p>
    </div>
  );
}

export default Card; // Export the Card component as the default export