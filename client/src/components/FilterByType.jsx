/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import types from "../utils/types";

const FilterByType = ({ selectedType, onTypeChange }) => {
  return (
    <div className="flex space-x-2">
      <select
        className="bg-white border border-gray-300 rounded-md shadow-sm p-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={selectedType}
        onChange={onTypeChange}
      >
        <option value="">Any Type</option>
        {types.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByType;
