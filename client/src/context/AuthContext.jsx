/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isCompany, setIsCompany] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        if (decodedToken.companyName) {
          setUserName(decodedToken.companyName);
          setIsCompany(true);
          setIsEmployee(false);
        } else {
          setUserName(decodedToken.name);
          setIsCompany(false);
          setIsEmployee(true);
        }
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      setIsAuthenticated(true);
      if (decodedToken.companyName) {
        setUserName(decodedToken.companyName);
        setIsCompany(true);
        setIsEmployee(false);
      } else {
        setUserName(decodedToken.name);
        setIsCompany(false);
        setIsEmployee(true);
      }
      Cookies.set("access_token", token);
    } catch (error) {
      console.error("Invalid token", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsCompany(false);
    setIsEmployee(false);
    setUserName("");
    Cookies.remove("access_token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isCompany,
        isEmployee,
        userName,
        setIsAuthenticated,
        setIsCompany,
        setIsEmployee,
        setUserName,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
