/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = Cookies.get("access_token");
        if (token) {
          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken);

          const response = await axios.get(
            `http://localhost:5500/api/company/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          setCompany(response.data);
        } else {
          throw new Error("No token found");
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        setError("Could not fetch company details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{company.C_Name}</h1>
      <p>
        <strong>Email:</strong> {company.C_Email}
      </p>
      <p>
        <strong>DOB:</strong>{" "}
        {company.DOB ? new Date(company.DOB).toLocaleDateString() : "N/A"}
      </p>
      <p>
        <strong>Address:</strong> {company.Address || "N/A"}
      </p>
      <p>
        <strong>Phone Number:</strong> {company.Phone_number || "N/A"}
      </p>
      <p>
        <strong>Description:</strong> {company.description || "N/A"}
      </p>
      <p>
        <strong>Category:</strong> {company.Category}
      </p>
    </div>
  );
};

export default CompanyProfile;
