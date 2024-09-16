/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import categories from "../utils/categories";

const Filter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <>
      <select
        className="bg-white border border-gray-300 rounded-md shadow-sm p-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={selectedCategory}
        onChange={onCategoryChange}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
};

export default Filter;
