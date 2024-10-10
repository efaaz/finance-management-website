import authService from "@/appwrite/auth";
import { login, logout } from "@/features/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);

  // Function to check if a user is logged in
  const checkUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        dispatch(login({ userData: user }));
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.log("Error checking user:", error);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      setCurrentUser(null);
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  // Check user status on component mount
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Website name */}
        <div>
          <Link to="/" className="text-white text-2xl font-bold">
            MyWebsite
          </Link>
        </div>

        {/* Right side: Routes and Auth buttons */}
        <div className="flex space-x-4 items-center">
          <Link to="/" className="text-white hover:text-gray-400">
            Home
          </Link>
          <Link to="/features" className="text-white hover:text-gray-400">
            Features
          </Link>
          <Link to="/about" className="text-white hover:text-gray-400">
            About Us
          </Link>

          {/* Conditional rendering based on user status */}
          {currentUser ? (
            <>
              <span className="text-white">Hello, {currentUser.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
