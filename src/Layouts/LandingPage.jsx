import authService from "@/appwrite/auth";
import AppSidebar from "@/components/AppSidebar/AppSidebar";
import Navbar from "@/components/Header/Navbar";
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
    <>
      <Navbar />
      <main className="flex">
        <div className="">
          <AppSidebar />
        </div>
        <div className="flex-grow w-full">
          <Outlet />
        </div>
      </main>
    </>
  ) : null;
}

export default LandingPage;
