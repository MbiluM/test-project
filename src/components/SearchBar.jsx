import React, { useState } from 'react'; // Import React and useState hook

// SearchBar component to handle user input for searching products
function SearchBar({ onSearch }) {
  // State to store the current search query
  const [query, setQuery] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSearch(query); // Pass the search query to the parent component (App)
  };

  return (
    <div>
      <h2>Search Products</h2> {/* Subheading for the search bar */}
      <form onSubmit={handleSubmit}>
        {/* Input field for entering the search query */}
        <input
          type="text"
          placeholder="Search for products..." // Placeholder text
          value={query} // Bind the input value to the query state
          onChange={(e) => setQuery(e.target.value)} // Update the query state on input change
        />
        <button type="submit">Search</button> {/* Submit button */}
      </form>
    </div>
  );
}

export default SearchBar; // Export the SearchBar component as the default export