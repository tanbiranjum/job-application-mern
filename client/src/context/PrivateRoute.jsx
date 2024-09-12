/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isCompany, isEmployee } = useAuth();

  // Render nothing (or a loading spinner) until the authentication state is determined
  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={isCompany ? "/company-login" : "/employee-login"} />;
  }

  return children;
};

export default PrivateRoute;
