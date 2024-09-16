import { useNavigate } from "react-router-dom";
import homeBg from "../assets/home-bg2.jpg";
import CompanySlider from "./CompanySlider.jsx";
import AppliedJobsSlider from "./AppliedJobsSlider";
import CompanyJobsSlider from "./CompanyJobsSlider";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();

  const { isAuthenticated, isCompany } = useAuth();
  const handleJobsClick = () => {
    navigate("/jobs");
  };

  return (
    <>
      <div
        className="bg-cover bg-center flex items-center justify-center relative"
        style={{
          height: `calc(100vh - 64px)`,
          backgroundImage: `url(${homeBg})`,
        }}
      >
        <div className="text-gray-700 z-10 text-center">
          <h1 className="text-4xl font-bold">Welcome to Our Job Portal</h1>
          <p className="mt-2 text-lg">Find your dream job today!</p>
          <div className="mt-4">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-emerald-700 transition"
              onClick={handleJobsClick}
            >
              View Jobs
            </button>
          </div>
        </div>
      </div>

      <CompanySlider />

      {isAuthenticated && (
        <>{isCompany ? <CompanyJobsSlider /> : <AppliedJobsSlider />}</>
      )}
    </>
  );
}
