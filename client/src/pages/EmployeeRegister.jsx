
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

export default function EmployeeRegister() {
  const [formData, setFormData] = useState({
    E_Name: "",
    E_Email: "",
    Password: "",
    
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
        "http://localhost:5500/register",
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
        E_Name: "",
        E_Email: "",
        Password: "",
       
      });
      navigate("/employee-login");
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
          Register 
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            id="E_Name"
            className="bg-gray-100 p-3 text-sm rounded-lg border border-gray-300"
            value={formData.E_Name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="employee Email"
            id="E_Email"
            className="bg-gray-100 p-3 text-sm rounded-lg border border-gray-300"
            value={formData.E_Email}
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
          <Link to="/employee-login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
