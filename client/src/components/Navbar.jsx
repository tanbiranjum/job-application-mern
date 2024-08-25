/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-rose-300 to-rose-300 via-red-300">
      <div className="flex justify-between items-center mx-auto max-w-6xl px-8 py-4">
        <Link to="/">
          <h1 className="font-bold">Job Seeker</h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>{" "}
          </Link>
          <Link to="/jobs">
            <li>Jobs</li>{" "}
          </Link>
          <Link to="/companies">
            <li>Companies</li>{" "}
          </Link>
          <Link to="/employee">
            <li>User</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
