/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import JobDetails from "./JobDetails.jsx";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditJobForm from "./EditJobForm";
import ConfirmJobDelete from "./ConfirmJobDelete";

const CompanyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      const token = Cookies.get("access_token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const companyId = decodedToken.id;

          const response = await axios.get(
            `http://localhost:5500/api/jobs/company/${companyId}`
          );
          setJobs(response.data);
        } catch (error) {
          console.error("Error fetching company jobs:", error);
          toast.error("An error occurred while fetching company jobs.");
        }
      }
    };

    fetchCompanyJobs();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJobId(job._id);
  };

  const handleCloseDetails = () => {
    setSelectedJobId(null);
  };

  const handleEditJob = (job) => {
    setJobToEdit(job);
    setIsEditing(true);
  };

  const updateJobData = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
    );
    toast.success("Job updated successfully!");
    setIsEditing(false);
    setJobToEdit(null);
  };

  const handleDeleteJob = (job) => {
    setJobToDelete(job._id);
    setShowDeleteConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowDeleteConfirmation(false);
    setJobToDelete(null);
  };

  const handleDeleteConfirmed = (jobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    toast.success("Job deleted successfully!");
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-4 space-x-4">
        <h2 className="text-lg font-bold items-center text-center p-2">
          Company Jobs
        </h2>
      </div>

      <div className="mx-4 grid grid-cols-1 min-h-[50vh] items-center justify-items-center">
        {jobs.length === 0 ? (
          <div className="text-center text-gray-500 col-span-1">
            No jobs found for this company.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-[#fffcf2] rounded-lg border-2 shadow-md p-4 hover:shadow-lg hover:scale-105 transition duration-300 relative"
                style={{
                  background: `linear-gradient(135deg, #fffcf2 50%, #a7f3d0 50%)`,
                }}
              >
                <h3
                  className="text-lg font-semibold mb-2 inline-block hover:underline"
                  onClick={() => handleJobClick(job)}
                >
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Type:</strong> {job.job_type}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Category:</strong> {job.Category}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Posted At:</strong>{" "}
                  {new Date(job.posted_at).toLocaleDateString()}
                </p>

                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditJob(job)}
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteJob(job)}
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedJobId && (
        <JobDetails jobId={selectedJobId} onClose={handleCloseDetails} />
      )}

      {isEditing && (
        <EditJobForm
          job={jobToEdit}
          onClose={() => setIsEditing(false)}
          updateJobData={updateJobData}
        />
      )}

      {showDeleteConfirmation && (
        <ConfirmJobDelete
          jobId={jobToDelete}
          onClose={handleCloseConfirmation}
          onDelete={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default CompanyJobs;
