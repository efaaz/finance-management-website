import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <div className="flex justify-center items-center h-screen gap-2">
        <div>
          <h1 className="text-7xl text-red-600 mb-4">
            404 <span className="text-white">error</span>
          </h1>
          <p className="text-7xl text-white">Not Found</p>
          <div className=" text-center mt-4">
            <Link to="/" className="underline font-medium">
              Go back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error;
