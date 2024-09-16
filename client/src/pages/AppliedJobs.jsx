import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const token = Cookies.get("access_token");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const id = decodedToken.id;
          const response = await axios.get(
            `http://localhost:5500/api/jobs/applied/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          setAppliedJobs(response.data);
        } catch (error) {
          console.error("Error fetching applied jobs:", error);
          setError("Failed to load applied jobs.");
          toast.error("Failed to load applied jobs.");
        }
      }
    };

    fetchAppliedJobs();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="text-center text-gray-500">No applied jobs found.</div>
    );
  }

  return (
    <div className="relative mx-4 p-12">
      <h2 className="text-2xl font-bold text-center mb-4">Your Applied Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {appliedJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-lg border-2 shadow-md p-4 hover:shadow-lg hover:scale-105 transition duration-300"
            style={{
              background: `linear-gradient(135deg, white 50%, #a7f3d0 50%)`,
            }}
          >
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p>
              <strong>Location:</strong> {job.location}
            </p>
            <p>
              <strong>Type:</strong> {job.job_type}
            </p>
            <p>
              <strong>Category:</strong> {job.Category}
            </p>
            <p>
              <strong>Application Date:</strong>{" "}
              {new Date(job.appliedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
