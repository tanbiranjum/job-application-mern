/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim() === "") {
      onSearch("");
    } else {
      onSearch(keyword);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="bg-white mr-1 p-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <FaSearch
        className="text-gray-600 hover:text-blue-500 cursor-pointer transition duration-300"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Search;
