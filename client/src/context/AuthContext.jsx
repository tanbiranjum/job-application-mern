/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState,useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if there's a token in cookies on initial load
    const token = Cookies.get("access_token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        setUserName(decodedToken.userName || (decodedToken.isCompany ? "Company Name" : "User"));
        setIsCompany(decodedToken.isCompany || false);
      } catch (error) {
        console.error("Invalid token", error);
        logout(); // Optionally handle logout if token is invalid
      }
    }
  }, []);

  const login = (token, companyName) => {
    try {
      const decodedToken = jwtDecode(token);
      setIsAuthenticated(true);
      setUserName(companyName || decodedToken.userName);
      setIsCompany(decodedToken.isCompany || false);
      Cookies.set("access_token", token);
    } catch (error) {
      console.error("Invalid token", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsCompany(false);
    setUserName("");
    Cookies.remove("access_token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isCompany, userName, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
