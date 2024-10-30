import authService from "@/appwrite/auth";
import Navbar from "@/components/ui/Header/Navbar";
import { logout, SignIN } from "@/features/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

function LandingPage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(SignIN({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Navbar></Navbar>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  ) : null;
}

export default LandingPage;
