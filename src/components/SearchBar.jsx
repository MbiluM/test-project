import React, { useState, useEffect } from 'react';

function SearchBar() {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await fetch('https://api-sneaks.herokuapp.com/v1/sneakers');
        if (!response.ok) {
          throw new Error('Failed to fetch sneakers');
        }
        const data = await response.json();
        setSneakers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSneakers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Sneakers</h2>
      <ul>
        {sneakers.map((sneaker) => (
          <li key={sneaker.id}>{sneaker.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;