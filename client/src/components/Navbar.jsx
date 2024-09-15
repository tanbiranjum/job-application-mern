/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ dropdownOpen, toggleDropdown, closeDropdown }) => {
  const { isAuthenticated, userName, isCompany, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    closeDropdown();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleProfileClick = () => {
    if (isCompany) {
      navigate(`/company-profile`);
    } else {
      navigate(`/employee-profile`);
    }
    closeDropdown();
  };

  const handleAppliedJobsClick = () => {
    navigate(`/applied-jobs`);
    closeDropdown();
  };

  const handleCompanyJobsClick = () => {
    navigate(`/company-jobs`);
    closeDropdown();
  };

  const handlePostJobClick = () => {
    navigate(`/post-job`);
    closeDropdown();
  };

  return (
    <div className="bg-gradient-to-r from-rose-300 to-rose-300 via-red-300 relative z-50">
      <div className="flex justify-between items-center mx-auto max-w-6xl px-8 py-4">
        <Link to="/">
          <h1 className="font-bold">Job Seeker</h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/companies">
                <li>Companies</li>
              </Link>
              <Link to="/jobs">
                <li>Jobs</li>
              </Link>
            </>
          )}

          {!isAuthenticated ? (
            <div className="relative">
              <button className="focus:outline-none" onClick={toggleDropdown}>
                Login
              </button>
              {dropdownOpen && (
                <ul className="absolute bg-[#fffcf2] text-xs shadow-md rounded-md py-2 transition-transform transform translate-y-2 origin-top-right z-50">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/employee-login")}
                  >
                    Login as Employee
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/company-login")}
                  >
                    Login as Company
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                className="font-bold focus:outline-none"
                onClick={toggleDropdown}
              >
                {userName}
              </button>
              {dropdownOpen && (
                <ul className="absolute bg-white shadow-md mt-2 text-xs rounded-md py-2 transition-transform transform translate-y-2 origin-top-right">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleProfileClick}
                  >
                    {isCompany ? "Company Profile" : "Employee Profile"}
                  </li>
                  {isCompany && (
                    <>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleCompanyJobsClick}
                      >
                        Company Jobs
                      </li>
                      <li
                        className="px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
                        onClick={handlePostJobClick}
                      >
                        Post A Job
                      </li>
                    </>
                  )}
                  {!isCompany && (
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleAppliedJobsClick}
                    >
                      Applied Jobs
                    </li>
                  )}
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
