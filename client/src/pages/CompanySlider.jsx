// src/components/CompanySlider.jsx
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const CompanySlider = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  const handleViewAllCompanies = () => {
    navigate("/companies");
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/api/company/companies"
        );
        setCompanies(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error("An error occurred while fetching companies.");
      }
    };

    fetchCompanies();
  }, []);

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
          infinite: true,
          dots: true,
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
      <h2 className="text-center text-2xl font-bold mb-4">
        Featured Companies
      </h2>
      <Slider {...settings}>
        {companies.map((company) => (
          <div key={company._id} className="p-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">
                  {company.C_Name || "Not Available"}
                </h3>
                {company.logo && (
                  <img
                    src={`http://localhost:5500/${company.logo}`}
                    alt={`${company.C_Name} Logo`}
                    className="w-12 h-12 object-cover rounded-full border-2 border-white"
                    style={{ backgroundColor: "tansparent" }}
                  />
                )}
              </div>
              <p className="text-sm text-gray-600">
                {company.description || "Not Available"}
              </p>
              <p className="text-sm text-gray-600">
                Address: {company.Address || "Not Available"}
              </p>
              <p className="text-sm text-gray-600">
                Category: {company.Category || "Not Available"}
              </p>
            </div>
          </div>
        ))}
      </Slider>

      <div className="text-center mt-10">
        <button
          onClick={handleViewAllCompanies}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          View All Companies
        </button>
      </div>
    </div>
  );
};

export default CompanySlider;
