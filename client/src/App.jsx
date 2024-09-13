import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./context/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./utils/toastStyle.css";
import Home from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar.jsx";
import Companies from "./pages/Companies.jsx";
import CompanyRegister from "./pages/CompanyRegister.jsx";
import EmployeeRegister from "./pages/EmployeeRegister.jsx";
import CompanyLogin from "./pages/CompanyLogin.jsx";
import EmployeeLogin from "./pages/EmployeeLogin.jsx";
import CompanyProfile from "./pages/CompanyProfile.jsx";
import EmployeeProfile from "./pages/EmployeeProfile.jsx";
import CompanyDetails from "./pages/CompanyDetails.jsx";
import "./index.css";
import Jobs from "./pages/Jobs.jsx";
import CompanyJobs from "./pages/CompanyJobs.jsx";
import PostJob from "./pages/PostJob.jsx";

export default function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar
          dropdownOpen={dropdownOpen}
          toggleDropdown={toggleDropdown}
          closeDropdown={closeDropdown}
        />
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={true}
          className="toast-container"
          toastClassName="Toastify__toast"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/companies"
            element={
              <PrivateRoute>
                <Companies />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <Jobs />
              </PrivateRoute>
            }
          />
          <Route path="/company-register" element={<CompanyRegister />} />
          <Route path="/employee-register" element={<EmployeeRegister />} />

          <Route
            path="/company-login"
            element={<CompanyLogin closeDropdown={closeDropdown} />}
          />
          <Route
            path="/employee-login"
            element={<EmployeeLogin closeDropdown={closeDropdown} />}
          />
          <Route
            path="/company-profile"
            element={
              <PrivateRoute>
                <CompanyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee-profile"
            element={
              <PrivateRoute>
                <EmployeeProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/companies/:companyId"
            element={
              <PrivateRoute>
                <CompanyDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/company-jobs"
            element={
              <PrivateRoute>
                <CompanyJobs />
              </PrivateRoute>
            }
          />
          <Route
            path="/post-job"
            element={
              <PrivateRoute>
                <PostJob />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
