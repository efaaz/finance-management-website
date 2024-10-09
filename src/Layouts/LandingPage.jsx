import React from "react";
import { Outlet } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default LandingPage;
