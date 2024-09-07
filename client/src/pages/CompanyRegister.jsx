import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import categories from "../utils/categories";
import { toast } from "react-toastify";

export default function CompanyRegister() {
  const [formData, setFormData] = useState({
    C_Name: "",
    C_Email: "",
    Password: "",
    Category: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5500/api/company/register",
        formData
      );

      setLoading(false);

      if (res.data.success === false) {
        setError(res.data.message || "Something went wrong!");
        toast.error(res.data.message || "Something went wrong!");
        return;
      }

      toast.success("Company created successfully!");
      setFormData({
        C_Name: "",
        C_Email: "",
        Password: "",
        Category: "",
      });
      navigate("/company-login");
    } catch (error) {
      setLoading(false);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="p-6 max-w-sm mx-auto bg-[#fffcf2] rounded-lg shadow-lg">
        <h1 className="text-center text-xl font-semibold mb-6">
          Register Your Company
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Company Name"
            id="C_Name"
            className="bg-gray-100 p-3 text-sm rounded-lg border border-gray-300"
            value={formData.C_Name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Company Email"
            id="C_Email"
            className="bg-gray-100 p-3 text-sm rounded-lg border border-gray-300"
            value={formData.C_Email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="Password"
            className="bg-gray-100 p-3 text-sm rounded-lg border border-gray-300"
            value={formData.Password}
            onChange={handleChange}
            required
          />
          <select
            id="Category"
            className="bg-gray-100 text-gray-400 p-3 text-sm rounded-lg border border-gray-300"
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
          <button
            disabled={loading}
            className="bg-blue-600 text-white p-3 text-sm rounded-lg uppercase hover:bg-blue-700 disabled:opacity-80 transition duration-200 cursor-pointer"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/company-login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
