/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const EmployeeLogin = ({
  closeDropdown,
}) => {
  const [formData, setFormData] = useState({
    E_Email: "",
    Password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

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
        "http://localhost:5500/login",
        formData
      );

      console.log(res);

      setLoading(false);

      if (res.status === 200) {
        const { token, E_Name } = res.data;
        login(token, E_Name);
        closeDropdown();
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        setError("Invalid credentials!");
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 max-w-sm mx-auto bg-[#fffcf2] rounded-lg shadow-lg">
        <h1 className="text-center text-xl font-semibold mb-6">
          Employee Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
        <p className="text-center mt-6 text-sm">
          Not registered yet?{" "}
          <Link
            to="/employee-register"
            className="text-blue-500 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmployeeLogin;
