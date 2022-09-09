import React, { useState } from "react";

const Search = ({productsList, setProductsList, setFilteredProducts, element}) => {
    const [searchTerm, setSearchTerm] = useState("");


    function postMatches(element, text) {
        if (element.description.toLowerCase().includes(text.toLowerCase()) || element.name.toLowerCase().includes(text.toLowerCase()) || element.roast.toLowerCase().includes(text.toLowerCase()) || element.country.toLowerCase().includes(text.toLowerCase()) || element.grind.toLowerCase().includes(text.toLowerCase()))  {
          return true;
        }
      }
    
      function handleSubmit(event) {
        event.preventDefault()
        const filteredProducts = productsList.filter((element) => postMatches(element, searchTerm));
        {
          filteredProducts.length
            ? setFilteredProducts(filteredProducts)
            : setFilteredProducts([]);
        }
    
    }
    return (
      <form className="searching"onSubmit={handleSubmit}>
        <input
         id="searchBar"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></input>
        <button id="searchButton" type="submit">SEARCH</button>
      </form>
    
    );
        }
export default Search 