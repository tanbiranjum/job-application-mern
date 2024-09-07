/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [userName, setUserName] = useState("");

  const login = (token, companyName) => {
    setIsAuthenticated(true);
    setIsCompany(true);
    setUserName(companyName);
    Cookies.set("access_token", token);
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
