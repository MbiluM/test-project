import { useState, useEffect } from 'react'; // Import React hooks
import './App.css'; // Import CSS for styling
import SearchBar from './components/SearchBar'; // Import SearchBar component
import Card from './components/Card'; // Import Card component

function App() {
  // State to store all products fetched from the API
  const [products, setProducts] = useState([]);
  // State to store products filtered based on the search query
  const [filteredProducts, setFilteredProducts] = useState([]);
  // State to track whether the data is still loading
  const [loading, setLoading] = useState(true);
  // State to store any error messages during the fetch process
  const [error, setError] = useState(null);

  // useEffect to fetch products from the API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch data from the Fake Store API
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products'); // Throw an error if the response is not OK
        }
        const data = await response.json(); // Parse the JSON response
        setProducts(data.slice(0, 10)); // Limit to 10 products for display
        setFilteredProducts(data.slice(0, 10)); // Initialize filtered products with the same data
      } catch (err) {
        setError(err.message); // Set the error message if an error occurs
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };

    fetchProducts(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to handle search queries
  const handleSearch = (query) => {
    if (query.trim() === '') {
      // If the search query is empty, show all products
      setFilteredProducts(products);
    } else {
      // Filter products based on whether the title includes the search query (case-insensitive)
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered); // Update the filtered products state
    }
  };

  return (
    <>
      <h1>Product Store</h1> {/* Main heading */}
      {loading && <p>Loading products...</p>} {/* Show loading message while fetching data */}
      {error && <p>Error: {error}</p>} {/* Show error message if an error occurs */}
      <SearchBar onSearch={handleSearch} /> {/* Render the SearchBar component */}
      <div className="sneaker-gallery">
        {/* Render a Card component for each filtered product */}
        {filteredProducts.map((product) => (
          <Card key={product.id} sneaker={product} />
        ))}
      </div>
    </>
  );
}

export default App; // Export the App component as the default export

