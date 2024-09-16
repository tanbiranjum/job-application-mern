/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  companiesPerPage,
  totalCompanies,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalCompanies / companiesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const displayLimit = 5;
  let startPage = Math.max(1, currentPage - Math.floor(displayLimit / 2));
  const endPage = Math.min(totalPages, startPage + displayLimit - 1);

  if (endPage - startPage < displayLimit - 1) {
    startPage = Math.max(1, endPage - displayLimit + 1);
  }

  return (
    <nav className="py-5 px-4">
      <ul className="flex justify-center items-center space-x-2">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 border rounded-full bg-white text-gray-500 hover:bg-gray-200 disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
        </li>

        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          <li key={number}>
            <a
              href="#"
              onClick={() => paginate(number)}
              className={`px-3 py-2 leading-tight border rounded-md ${
                currentPage === number
                  ? "font-bold text-lg border-black-500 hover:bg-blue-400 "
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              {number}
            </a>
          </li>
        ))}

        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 border rounded-full bg-white text-gray-500 hover:bg-gray-200 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
