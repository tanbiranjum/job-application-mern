/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import categories from "../utils/categories";

const EditCompanyForm = ({ company, setIsEditing, updateCompanyData }) => {
  const [formData, setFormData] = useState({
    C_Name: company.C_Name || "",
    C_Email: company.C_Email || "",
    Address: company.Address || "",
    DOB: company.DOB ? company.DOB.split("T")[0] : "",
    Phone_number: company.Phone_number || "",
    Category: company.Category || "",
    description: company.description || "",
  });

  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("access_token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const companyId = decodedToken.id;

        const response = await axios.put(
          `http://localhost:5500/api/company/companies/${companyId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        updateCompanyData(response.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Edit Company Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Your Company Name
          </label>
          <input
            type="text"
            name="C_Name"
            value={formData.C_Name}
            onChange={handleChange}
            className="w-full p-1 text-black border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Your Email</label>
          <input
            type="email"
            name="C_Email"
            value={formData.C_Email}
            onChange={handleChange}
            className="w-full p-1 border text-black rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Your Address</label>
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            className="w-full p-1 border text-black rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Your Established Date
          </label>
          <input
            type="date"
            name="DOB"
            value={formData.DOB?.split("T")[0] || ""}
            onChange={handleChange}
            className="w-full p-1 border text-black rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Your Phone Number
          </label>
          <input
            type="text"
            name="Phone_number"
            value={formData.Phone_number}
            onChange={handleChange}
            className="w-full p-1 border text-black rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Your Bio</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-1 border text-black rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            id="Category"
            className="bg-gray-100 text-black p-1 text-sm  rounded-lg border border-gray-300"
            value={formData.Category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="ml-4 bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCompanyForm;
