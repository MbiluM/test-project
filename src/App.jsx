import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Card from './components/Card';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.slice(0, 10)); // Limit to 10 products for display
        setFilteredProducts(data.slice(0, 10)); // Initialize filtered products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setFilteredProducts(products); // Show all products if query is empty
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <h1>Product Store</h1>
      {loading && <p>Loading products...</p>}
      {error && <p>Error: {error}</p>}
      <SearchBar onSearch={handleSearch} />
      <div className="sneaker-gallery">
        {filteredProducts.map((product) => (
          <Card key={product.id} sneaker={product} />
        ))}
      </div>
    </>
  );
}

export default App;

