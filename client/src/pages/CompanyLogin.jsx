/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const CompanyLogin = ({
  setIsAuthenticated,
  setIsCompany,
  setUserName,
  closeDropdown,
}) => {
  const [formData, setFormData] = useState({
    C_Email: "",
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
        "http://localhost:5500/api/company/login",
        formData
      );

      console.log(res);

      setLoading(false);

      if (res.status === 200) {
        const { token } = res.data;
        console.log(token);

        setIsAuthenticated(true);
        Cookies.set("access_token", token);
        setIsCompany(true);
        setUserName(res.data.C_Name);
        closeDropdown();
        navigate("/");
      } else {
        setError("Invalid credentials!");
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
          Company Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            to="/company-register"
            className="text-blue-500 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CompanyLogin;
