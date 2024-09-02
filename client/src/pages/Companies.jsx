/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Filter from "../components/Filter";
import CompanyDetails from "./CompanyDetails.jsx";

const Companies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(15);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/api/company/companies"
        );
        setCompanies(response.data);
        console.log("Fetched Companies: ", response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleSearch = async (keyword) => {
    setSelectedCategory("");
    setIsFiltering(false);

    if (keyword.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      setCurrentPage(1);
      navigate("/companies");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5500/api/company/companies/search?keyword=${keyword}`
      );
      setSearchResults(response.data);
      setIsSearching(true);
      setCurrentPage(1);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSearchResults([]);
        setIsSearching(true);
      } else {
        console.error("Error searching companies:", error);
      }
    }
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setIsSearching(false);

    if (category === "") {
      setFilteredCompanies([]);
      setIsFiltering(false);
      setCurrentPage(1);
      navigate("/companies");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5500/api/company/companies/filter?Category=${category}`
      );

      if (response.data.length === 0) {
        console.log(`No companies found for the "${category}" category.`);
        setFilteredCompanies([]);
        setIsFiltering(true);
      } else {
        console.log("Filtered Companies: ", response.data);
        setFilteredCompanies(response.data);
        setIsFiltering(true);
      }

      setCurrentPage(1);
    } catch (error) {
      console.error("Error filtering companies by category:", error);
      setFilteredCompanies([]);
      setIsFiltering(true);
    }
  };

  const handleCompanyClick = (company) => {
    setSelectedCompanyId(company._id);
    console.log(company._id);
  };

  const handleCloseDetails = () => {
    setSelectedCompanyId(null);
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;

  const currentCompanies = isSearching
    ? searchResults.slice(indexOfFirstCompany, indexOfLastCompany)
    : isFiltering
    ? filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany)
    : companies.slice(indexOfFirstCompany, indexOfLastCompany);

  const totalCompanies = isSearching
    ? searchResults.length
    : isFiltering
    ? filteredCompanies.length
    : companies.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-4 space-x-4">
        <h2 className="text-lg font-bold items-center text-center p-2">
          Browse companies
        </h2>
        <Filter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <Search onSearch={handleSearch} />
      </div>

      <div className="mx-4 grid grid-cols-1 min-h-[50vh] items-center justify-items-center">
        {currentCompanies.length === 0 ? (
          <div className="text-center text-gray-500 col-span-1">
            {isFiltering && selectedCategory
              ? `No companies found for the "${selectedCategory}" category.`
              : isSearching
              ? "No such companies match your input."
              : "No companies found."}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
            {currentCompanies.map((company) => (
              <div
                key={company._id}
                className="bg-[#fffcf2] rounded-lg border-2 shadow-md p-2 hover:shadow-lg hover:scale-105 transition duration-300"
                style={{
                  background: `linear-gradient(135deg, #fffcf2 50%, #fecaca 50%)`,
                }}
                onClick={() => handleCompanyClick(company)}
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
            ))}
          </div>
        )}
      </div>
      <Pagination
        companiesPerPage={companiesPerPage}
        totalCompanies={totalCompanies}
        paginate={paginate}
        currentPage={currentPage}
      />

      {selectedCompanyId && (
        <CompanyDetails
          companyId={selectedCompanyId}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default Companies;
