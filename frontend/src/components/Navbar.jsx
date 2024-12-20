/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken, userData } = useContext(AppContext); // Assuming `user` contains profile details

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setShowDropdown(false); // Close dropdown on logout
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-gray-800">
          City Star
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
            }
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
            }
          >
            Contact
          </NavLink>
        </ul>

        {/* Profile Dropdown & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {token ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-2 focus:outline-none"
                aria-label="Profile menu"
              >
                <img
                  src={userData?.image || "/default-profile.png"} // Dynamic profile image or default
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("my-profile");
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("my-appointments");
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    My Appointments
                  </button>
                  <button
                    onClick={logout}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden focus:outline-none"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
