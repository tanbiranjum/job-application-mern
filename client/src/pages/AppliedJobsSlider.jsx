import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AppliedJobsSlider = () => {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);

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
          toast.error("Failed to load applied jobs.");
        }
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleViewAppliedJobs = () => {
    navigate("/applied-jobs");
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-8">
      <h2 className="text-center text-2xl font-bold mb-4">Your Applied Jobs</h2>
      <Slider {...settings}>
        {appliedJobs.map((job) => (
          <div key={job._id} className="p-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-600">
                Location: {job.location || "Not Available"}
              </p>
              <p className="text-sm text-gray-600">
                Type: {job.job_type || "Not Available"}
              </p>
            </div>
          </div>
        ))}
      </Slider>

      <div className="text-center mt-10">
        <button
          onClick={handleViewAppliedJobs}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          View my applied jobs
        </button>
      </div>
    </div>
  );
};

export default AppliedJobsSlider;
