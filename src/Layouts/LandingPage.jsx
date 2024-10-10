import Navbar from "@/components/ui/Header/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
}

export default LandingPage;
