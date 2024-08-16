import React, { useState, useEffect } from "react";

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || []
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
      updateSearchHistory(query);
    }
  };

  const updateSearchHistory = (newQuery) => {
    let updatedHistory = [newQuery, ...searchHistory];
    if (updatedHistory.length > 10) {
      updatedHistory = updatedHistory.slice(0, 10);
    }
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  useEffect(() => {
    if (query.trim() !== "") {
      setSuggestions(
        searchHistory.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  }, [query, searchHistory]);

  return (
    <div className="relative flex-1">
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border py-2 px-4 rounded-l-lg w-full"
          placeholder="Search movies..."
          list="suggestions"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-5 rounded-r-lg"
        >
          Search
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded-lg mt-1 w-full z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
