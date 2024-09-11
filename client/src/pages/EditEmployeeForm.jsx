/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { toast } from "react-toastify";

const EditEmployeeForm = ({ employee, setIsEditing, updateEmployeeData }) => {
  const [formData, setFormData] = useState({
    E_Name: employee.E_Name || "",
    E_Email: employee.E_Email || "",
    Address: employee.Address || "",
    DOB: employee.DOB ? employee.DOB.split("T")[0] : "",
    Phone_number: employee.Phone_number || "",
    Gender:employee.Gender || "",
    Bio:employee.Bio || "",
    Skills:employee.Skills || '',
    Experience:employee.Experience || '',
    Education:employee.Education || '',
    Photo:employee.Photo || ""
  
  });

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0] // Get the file object
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");

    try {
      const token = Cookies.get("access_token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.id;

        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }

        const response = await axios.put(
          `http://localhost:5500/update/${id}`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        updateEmployeeData(response.data);
        setIsEditing(false);
        toast.success("Company details updated successfully!");
      }
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error("An error occurred while updating the company details.");
    }
  };

  return (
    <div className="mt-8 p-6 bg-[#fffcf2] text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Edit Employee Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Your Name
          </label>
          <input
            type="text"
            name="E_Name"
            value={formData.E_Name}
            onChange={handleChange}
            className="w-full p-1 text-black text-sm border rounded"
          />

        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Your Email
          </label>
          <input
            type="email"
            name="E_Email"
            value={formData.E_Email}
            onChange={handleChange}
            className="w-full p-1 border text-black text-sm rounded"
          />

        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Your Address
          </label>
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            className="w-full p-1 border text-black text-sm rounded"
          />

        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
           Birth date:
          </label>
          <input
            type="date"
            name="DOB"
            value={formData.DOB?.split("T")[0] || ""}
            onChange={handleChange}
            className="w-full p-1 border text-black text-sm rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Your Phone Number
          </label>
          <input
            type="text"
            name="Phone_number"
            value={formData.Phone_number}
            onChange={handleChange}
            className="w-full p-1 border text-black text-sm rounded"
          />

        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Your Bio
          </label>
          <input
            type="text"
            name="Bio"
            value={formData.Bio}
            onChange={handleChange}
            className="w-full p-1 border text-black text-sm rounded"
          />

        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Gender
          </label>
          <input
            type="text"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="w-full p-1 border text-black text-sm rounded"
          />

        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Skills
          </label>
          <input
            type="text"
            name="Skills"
            value={formData.Skills}
            onChange={handleChange}
            className="w-full p-1 border text-black text-sm rounded"
          />

        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Experience
          </label>
          <input
            type="text"
            name="Experience"
            value={formData.Experience}
            onChange={handleChange}
            className="w-full p-1 border text-black text-sm rounded"
          />

        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Education
          </label>
          <input
            type="text"
            name="Education"
            value={formData.Education}
            onChange={handleChange}
            className="w-full p-1 border text-black text-sm rounded"
          />

        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">
            Education
          </label>
          <input
            type="file"
            name="Photo"
            
            onChange={handleChange}
            className="w-full p-1 border text-black text-sm rounded"
          />

        </div>
        
        <div className="mt-4">
          <button
            type="submit"
            className="bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600 text-sm"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="ml-4 bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
