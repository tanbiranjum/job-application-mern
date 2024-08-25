/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const Companies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(15);
  const [searchResults, setSearchResults] = useState([]);

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
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching companies:", error);
    }
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;

  const currentCompanies =
    searchResults.length > 0
      ? searchResults.slice(indexOfFirstCompany, indexOfLastCompany)
      : companies.slice(indexOfFirstCompany, indexOfLastCompany);

  const totalCompanies =
    searchResults.length > 0 ? searchResults.length : companies.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative">
      <h3 className="text-md items-center text-center p-4">Browse companies</h3>
      <Search onSearch={handleSearch} />
      
      <div className="mt-4 mx-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {currentCompanies.map((company) => (
          <div
            key={company.id}
            className="bg-[#fefaee] rounded-lg border-2 shadow-md p-2 hover:shadow-lg hover:scale-105 transition duration-300"
          >
            <h3 className="text-sm font-bold mb-1">{company.C_Name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              {company.description
                ? company.description.slice(0, 50) + "..."
                : "No description available"}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Address: {company.Address || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Category: {company.Category || "N/A"}
            </p>
          </div>
        ))}
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
