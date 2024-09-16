/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import companyLogo from "../assets/copany_profile.png";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditCompanyForm from "./EditCompanyForm.jsx";
import ConfirmDelete from "./ConfirmDelete.jsx";

const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = Cookies.get("access_token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const companyId = decodedToken.id;

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
          console.log(response);
        } else {
          throw new Error("No token found");
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        setError("Could not fetch company details.");
        toast.error("Could not fetch company details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const updateCompanyData = (updatedCompany) => {
    setCompany(updatedCompany);
    toast.success("Company details updated successfully!");
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div
      className="flex items-center justify-center bg-cover bg-center"
      style={{ minHeight: "calc(100vh - 60px)" }}
    >
      <div
        className="bg-white p-10 rounded-lg shadow-xl max-w-4xl w-2/3 mx-4 relative"
        style={{
          background: `linear-gradient(135deg, white 50%, #fecaca 50%)`,
        }}
      >
        <div className="flex items-center mb-6">
          <img
            src={`http://localhost:5500/${company.logo}`}
            alt="Company Logo"
            className="w-24 h-24 object-cover rounded-full border-4 border-rose-300 shadow-lg"
          />
          <div className="ml-4">
            <h1 className="text-4xl text-black font-extrabold">
              {company.C_Name}
            </h1>
            <p className="text-md text-gray-700">{company.C_Email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex text-sm items-center">
            <p className="font-serif italic text-xs text-gray-700">
              {company.description || "N/A"}
            </p>
          </div>
          <div className="flex text-sm items-center">
            <span className="font-semibold text-gray-800 w-1/3 text-base">
              Established:
            </span>
            <p className="font-medium text-gray-700">
              {company.DOB ? new Date(company.DOB).toLocaleDateString() : "N/A"}
            </p>
          </div>
          <div className="flex text-sm items-center">
            <span className="font-semibold text-gray-800 w-1/3 text-base">
              Your Address:
            </span>
            <p className="font-medium text-gray-700">
              {company.Address || "N/A"}
            </p>
          </div>
          <div className="flex text-sm items-center">
            <span className="font-semibold text-gray-800 text-base w-1/3">
              Your Field:
            </span>
            <p className="font-medium text-gray-700">{company.Category}</p>
          </div>
          <div className="flex text-sm items-center">
            <span className="font-semibold text-gray-800 text-base w-1/3">
              Your Phone Number:
            </span>
            <p className="font-medium text-gray-700">
              {company.Phone_number || "N/A"}
            </p>
          </div>
        </div>
        <div className="absolute top-8 right-8 flex space-x-4">
          <button
            className="text-emerald-500 hover:text-emerald-600"
            onClick={handleEdit}
          >
            <FaEdit size={24} />
          </button>
          <button
            className="text-red-400 hover:text-red-600"
            onClick={handleDeleteConfirmation}
          >
            <FaTrash size={24} />
          </button>
        </div>
        {isEditing && (
          <EditCompanyForm
            company={company}
            setIsEditing={setIsEditing}
            updateCompanyData={updateCompanyData}
          />
        )}
        {showDeleteConfirmation && (
          <ConfirmDelete onClose={handleCloseConfirmation} />
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
