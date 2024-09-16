/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import categories from "../utils/categories";
import types from "../utils/types";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    job_type: "",
    salary: "",
    benefits: "",
    requirements: "",
    responsibilities: "",
    skills: "",
    application_deadline: "",
    Category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const companyId = decodedToken.id;
      try {
        const response = await axios.post(
          `http://localhost:5500/api/jobs/create/${companyId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response.data.message);
        setFormData({
          title: "",
          description: "",
          location: "",
          job_type: "",
          salary: "",
          benefits: "",
          requirements: "",
          responsibilities: "",
          skills: "",
          application_deadline: "",
          Category: "",
        });
      } catch (error) {
        console.error("Error posting job:", error);
        toast.error("Failed to post job. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="text-sm">
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Job Type</label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" className="text-sm">
              Select job type
            </option>
            {types.map((type) => (
              <option className="text-sm" key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Benefits</label>
          <input
            type="text"
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Requirements
          </label>
          <input
            type="text"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Responsibilities
          </label>
          <input
            type="text"
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Application Deadline
          </label>
          <input
            type="date"
            name="application_deadline"
            value={formData.application_deadline}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Category</label>
          <select
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" className="text-sm">
              Select a category
            </option>
            {categories.map((category) => (
              <option className="text-sm" key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
