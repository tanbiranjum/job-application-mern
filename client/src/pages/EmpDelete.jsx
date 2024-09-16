/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const EmpDelete = ({ onClose }) => {
  const { setIsAuthenticated, setIsCompany, setUserName, setIsEmployee } =
    useAuth();
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);

  const handleDeleteClick = () => {
    setShowPasswordField(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = Cookies.get("access_token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.id;

        const verifyResponse = await axios.post(
          `http://localhost:5500/verify-password`,
          { id, Password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (verifyResponse.data.message === "Password verified successfully!") {
          await axios.delete(`http://localhost:5500/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });

          Cookies.remove("access_token");
          setIsAuthenticated(false);
          setUserName("");
          setIsCompany(false);
          setIsEmployee(false);
          onClose();
          toast.success("Account deleted successfully!");
        } else {
          setError("Incorrect password. Please try again.");
          toast.error("Incorrect password. Please try again.");
        }
      } else {
        throw new Error("No token found");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      setError("Invalid password");
      toast.error("An error occurred while deleting the account.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white text-black text-sm p-6 flex flex-col justify-center items-center rounded-lg shadow-lg w-1/3">
        <h3 className="text-lg font-bold mb-4">
          Are you sure you want to delete your account?
        </h3>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div
          className={`mb-4 flex flex-col items-center transition-all duration-500 ease-in-out transform ${
            showPasswordField
              ? "translate-y-0 opacity-100 max-h-40"
              : "translate-y-5 opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <label htmlFor="password" className="block font-medium mb-1">
            Enter your password:
          </label>
          <input
            type="password"
            id="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2 w-full bg-slate-200"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200"
            onClick={
              showPasswordField ? handleDeleteConfirm : handleDeleteClick
            }
          >
            {showPasswordField ? "Confirm" : "Yes, delete my account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpDelete;
