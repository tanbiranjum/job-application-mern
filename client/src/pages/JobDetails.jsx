/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import backgroundImage from "../assets/copany_profile.png";
import { toast } from "react-toastify";

const JobDetails = ({ jobId, onClose }) => {
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const token = Cookies.get("access_token");
      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:5500/api/jobs/${jobId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          setJob(response.data);
        } catch (error) {
          console.error("Error fetching job details:", error);
          setError("Failed to load job details.");
          toast.error("Failed to load job details.");
        }
      }
    };

    fetchJobDetails();
  }, [jobId]);

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

  if (!job) {
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
      <div className="bg-white p-10 mt-16 rounded-lg shadow-xl w-full max-w-lg relative z-10">
        <h1 className="text-2xl text-center font-bold text-gray-900 mb-4">
          {job.title}
        </h1>
        <div className="space-y-1 text-sm text-gray-700">
          <p className="font-serif italic text-xs">
            {job.description || "N/A"}
          </p>
          <p>
            <strong>Location:</strong> {job.location || "N/A"}
          </p>
          <p>
            <strong>Job Type:</strong> {job.job_type || "N/A"}
          </p>
          <p>
            <strong>Salary:</strong> {job.salary ? `$${job.salary}` : "N/A"}
          </p>
          <p>
            <strong>Application Deadline:</strong>{" "}
            {job.application_deadline
              ? new Date(job.application_deadline).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Category:</strong> {job.Category || "N/A"}
          </p>
          <p>
            <strong>Responsibilities:</strong>{" "}
            {job.responsibilities.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Requirements:</strong>{" "}
            {job.requirements.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Skills:</strong> {job.skills.join(", ") || "N/A"}
          </p>
        </div>
        <div className="flex gap-10 justify-center">
          <button
            className="mt-6 text-black bg-rose-300 hover:bg-rose-500 text-center hover:text-white py-2 px-2 rounded-full w-1/3 transition duration-200"
            onClick={onClose}
          >
            Close
          </button>
          {/* <button
            className="mt-6 text-black bg-emerald-300 hover:bg-emerald-500 text-center hover:text-white py-2 px-2 rounded-full w-1/3 transition duration-200"
            onClick={onClose}
          >
            Apply
          </button> */}
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>
  );
};

export default JobDetails;
