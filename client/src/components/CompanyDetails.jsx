/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import backgroundImage from "../assets/copany_profile.png";

const CompanyDetails = ({ companyId, onClose }) => {
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const token = Cookies.get("access_token");
      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:5500/api/company/companies/${companyId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          setCompany(response.data);
        } catch (error) {
          console.error("Error fetching company details:", error);
          setError("Failed to load company details.");
        }
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <p className="text-red-600 text-center">{error}</p>
          <button
            className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full w-full"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <p className="text-gray-700 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white p-10 rounded-lg shadow-xl w-full max-w-lg relative z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center left 70px",
        }}
      >
        <h1 className="text-2xl text-center font-bold text-gray-900 mb-4">
          {company.C_Name}
        </h1>
        <div className="space-y-2 text-sm text-gray-700">
          <p className="font-serif italic text-xs">
            {company.description || "N/A"}
          </p>
          <p>
            <strong>Established at:</strong>{" "}
            {company.DOB ? new Date(company.DOB).toLocaleDateString() : "N/A"}
          </p>
          <p>
            <strong>Our Address:</strong> {company.Address || "N/A"}
          </p>

          <p>
            <strong>Our Field:</strong> {company.Category}
          </p>
          <p>
            <strong>Phone Number:</strong> {company.Phone_number || "N/A"}
          </p>
          <p>
            <strong>Contact Us:</strong> {company.C_Email}
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className="mt-6 text-black bg-rose-300 hover:bg-rose-500 text-center hover:text-white py-2 px-4 rounded-full w-1/2 transition duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>
  );
};

export default CompanyDetails;
