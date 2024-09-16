/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Applicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = Cookies.get("access_token");
      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:5500/api/jobs/applicants/${jobId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          setApplicants(response.data);
        } catch (error) {
          console.error("Error fetching applicants:", error);
          setError("Failed to load applicants.");
          toast.error("Failed to load applicants.");
        }
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  if (applicants.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No applicants for this job.
      </div>
    );
  }

  return (
    <div className="relative mx-4 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        Applicants for the Job
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applicants.map((applicant) => (
          <div
            key={applicant._id}
            className="bg-white rounded-lg text-sm border-2 shadow-md p-4 hover:shadow-lg hover:scale-105 transition duration-300"
            style={{
              background: `linear-gradient(135deg, white 50%, #fed7aa 50%)`,
            }}
          >
            <h3 className="text-lg font-semibold">{applicant.E_Name}</h3>
            <p>
              <strong>Email:</strong> {applicant.E_Email}
            </p>
            <p>
              <strong>Phone:</strong> {applicant.Phone_number || "N/A"}
            </p>
            <p>
              <strong>Skills:</strong> {applicant.Skills.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Experience:</strong>{" "}
              {applicant.Experience.join(", ") || "N/A"}
            </p>
            <p>
              <strong>CV:</strong>{" "}
              {applicant.Cv ? (
                <a
                  href={`http://localhost:5500/${applicant.Cv}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 hover:underline"
                >
                  View CV
                </a>
              ) : (
                <span
                  className="text-gray-500 cursor-default"
                  title="Not available"
                >
                  View CV
                </span>
              )}
              {!applicant.Cv && (
                <span className="absolute left-0 -top-6 bg-gray-700 text-white text-xs rounded py-1 px-2 invisible group-hover:visible">
                  Not available
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applicants;
