/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import { FaEdit, FaTrash } from "react-icons/fa";
import EditEmployeeForm from "./EditEmployeeForm.jsx";
import EmpDelete from "./EmpDelete.jsx";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const baseUrl = "http://localhost:5500";

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = Cookies.get("access_token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const id = decodedToken.id;

          const response = await axios.get(
            `http://localhost:5500/getEmployeeById/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          setEmployee(response.data);
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

    fetchEmployee();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const updateEmployeeData = (updatedEmployee) => {
    setEmployee(updatedEmployee);
    toast.success("Employee details updated successfully!");
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
        className="bg-[#fffcf2] p-10 rounded-lg shadow-xl max-w-4xl w-2/3 mx-4 relative"
        style={{
          background: `linear-gradient(135deg, #fffcf2 50%, #fecaca 50%)`,
        }}
      >
        <div className="flex items-center mb-6">
          <img
            src={employee.Photo}
            alt="Photo"
            className="w-24 h-24 object-cover  border-4 border-rose-300 shadow-lg"
          />

          <div className="ml-4">
            <h1 className="text-4xl text-black font-extrabold">
              {employee.E_Name}
            </h1>
            <p className="text-md text-gray-700">{employee.E_Email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex text-sm items-center">
            <span className="font-semibold text-gray-800 w-1/3 text-base">
              Your Address:
            </span>
            <p className="font-medium text-gray-700">
              {employee.Address || "N/A"}
            </p>
          </div>

          <div className="flex text-sm items-center">
            <span className="font-semibold text-gray-800 text-base w-1/3">
              Phone Number:
            </span>
            <p className="font-medium text-gray-700">
              {employee.Phone_number || "N/A"}
            </p>
          </div>
          <div className="flex text-sm items-center">
            <span className="font-semibold text-gray-800 text-base w-1/3">
              Gender:
            </span>
            <p className="font-medium text-gray-700">
              {employee.Gender || "N/A"}
            </p>
          </div>
          <div className="flex text-sm items-center">
            <span className="font-semibold text-gray-800 text-base w-1/3">
              DOB:
            </span>
            <p className="font-medium text-gray-700">{employee.DOB || "N/A"}</p>
          </div>
          <div className="flex text-sm items-center">
            <span className="font-semibold text-gray-800 text-base w-1/3">
              Bio:
            </span>
            <p className="font-medium text-gray-700">{employee.Bio || "N/A"}</p>
          </div>
          <div className="flex text-sm items-center">
            <span className="font-semibold text-gray-800 text-base w-1/3">
              Skills:
            </span>
            <p className="font-medium text-gray-700">
              {employee.Skills || "N/A"}
            </p>
          </div>
          <div className="flex text-sm items-center">
            <span className="font-semibold text-gray-800 text-base w-1/3">
              Experience:
            </span>
            <p className="font-medium text-gray-700">
              {employee.Experience || "N/A"}
            </p>
          </div>
          <div className="flex text-sm items-center">
            <span className="font-semibold text-gray-800 text-base w-1/3">
              Education:
            </span>
            <p className="font-medium text-gray-700">
              {employee.Education || "N/A"}
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
          <EditEmployeeForm
            employee={employee}
            setIsEditing={setIsEditing}
            updateEmployeeData={updateEmployeeData}
          />
        )}
        {showDeleteConfirmation && (
          <EmpDelete onClose={handleCloseConfirmation} />
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;
