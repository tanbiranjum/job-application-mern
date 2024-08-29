/* eslint-disable react/prop-types */
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar.jsx";
import Companies from "./pages/Companies.jsx";
import CompanyRegister from "./pages/CompanyRegister.jsx";
import CompanyLogin from "./pages/CompanyLogin.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import "./index.css";

function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <BrowserRouter>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        isCompany={isCompany}
        setIsCompany={setIsCompany}
        userName={userName}
        setUserName={setUserName}
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
        closeDropdown={closeDropdown}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/companies"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Companies />
            </PrivateRoute>
          }
        />
        <Route
          path="/company-register"
          element={<CompanyRegister setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/company-login"
          element={
            <CompanyLogin
              setIsAuthenticated={setIsAuthenticated}
              setIsCompany={setIsCompany}
              setUserName={setUserName}
              closeDropdown={closeDropdown}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <EditProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
