/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const ConfirmJobDelete = ({ jobId, onClose, onDelete }) => {
  const handleDeleteConfirm = async () => {
    const token = Cookies.get("access_token");
    try {
      await axios.delete(`http://localhost:5500/api/jobs/delete/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(jobId);
      onClose();
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-[#fffcf2] text-black text-sm p-6 flex flex-col justify-center items-center rounded-lg shadow-lg w-1/3">
        <h3 className="text-lg font-bold mb-4">
          Are you sure you want to delete this job?
        </h3>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200"
            onClick={handleDeleteConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmJobDelete;
