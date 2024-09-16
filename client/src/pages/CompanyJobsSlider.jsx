// src/components/CompanyJobsSlider.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const CompanyJobsSlider = () => {
  const navigate = useNavigate();
  const [companyJobs, setCompanyJobs] = useState([]);

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      const token = Cookies.get("access_token");

      if (token) {
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken.id;
        try {
          const response = await axios.get(
            `http://localhost:5500/api/jobs/company/${companyId}`
          );
          setCompanyJobs(response.data);
        } catch (error) {
          console.error("Error fetching company jobs:", error);
          toast.error("Failed to load company jobs.");
        }
      }
    };

    fetchCompanyJobs();
  }, []);

  const handleViewCompanyJobs = () => {
    navigate("/company-jobs");
  };

  const settings = {
    dots: true,
    infinite: true,
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
      <h2 className="text-center text-2xl font-bold mb-4">Company Jobs</h2>
      <Slider {...settings}>
        {companyJobs.map((job) => (
          <div key={job._id} className="p-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-600">Location: {job.location}</p>
              <p className="text-sm text-gray-600">Type: {job.job_type}</p>
            </div>
          </div>
        ))}
      </Slider>

      <div className="text-center mt-10">
        <button
          onClick={handleViewCompanyJobs}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          View my company jobs
        </button>
      </div>
    </div>
  );
};

export default CompanyJobsSlider;
