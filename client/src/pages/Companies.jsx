/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import categories from "../utils/categories";

const Companies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(15);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/api/company/companies"
        );
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleSearch = async (keyword) => {
    if (keyword.trim() === "") {
      setSearchResults([]);
      setCurrentPage(1);
      navigate("/companies");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5500/api/company/companies/search?keyword=${keyword}`
      );
      setSearchResults(response.data);
      setFilteredCompanies([]);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching companies:", error);
    }
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === "") {
      setFilteredCompanies([]);
      setSearchResults([]);
      setCurrentPage(1);
      navigate("/companies");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5500/api/company/companies/filter?Category=${category}`
      );

      console.log(response);
      const filteredCompanies = response.data;
      console.log(filteredCompanies);
      setFilteredCompanies(filteredCompanies);
      setSearchResults([]);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error filtering companies by category:", error);
    }
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;

  const currentCompanies =
    searchResults.length > 0
      ? searchResults.slice(indexOfFirstCompany, indexOfLastCompany)
      : filteredCompanies.length > 0
      ? filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany)
      : companies.slice(indexOfFirstCompany, indexOfLastCompany);

  const totalCompanies =
    searchResults.length > 0
      ? searchResults.length
      : filteredCompanies.length > 0
      ? filteredCompanies.length
      : companies.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-4 space-x-4">
        <h2 className="text-lg font-bold items-center text-center p-2">
          Browse companies
        </h2>
        <select
          className="bg-[#fefaee] border border-gray-300 rounded-md shadow-sm p-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <Search onSearch={handleSearch} />
      </div>

      <div className="mx-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {currentCompanies.length > 0 ? (
          currentCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-[#fefaee] rounded-lg border-2 shadow-md p-2 hover:shadow-lg hover:scale-105 transition duration-300"
            >
              <h3 className="text-sm font-semibold mb-1">{company.C_Name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                {company.description
                  ? company.description.slice(0, 30) + "..."
                  : "No description available"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Address: {company.Address}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Category: {company.Category}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            {selectedCategory
              ? `No companies found by the "${selectedCategory}" category.`
              : "No companies found."}
          </div>
        )}
      </div>

      <Pagination
        companiesPerPage={companiesPerPage}
        totalCompanies={totalCompanies}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Companies;
