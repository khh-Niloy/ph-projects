import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <div className="flex w-[80%] mx-auto items-center justify-center px-6 pb-32 pt-16">
        <div className="w-[50%] flex items-center justify-center">
          <h1 className="text-[10rem] font-bold">404</h1>
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
            "We're sorry 😢 for the inconvenience! back to our homepage."
          </h1>
          <p className="py-4 text-base text-gray-800">
            The content you’re looking for doesn’t exist. Either it was removed,
            or you mistyped the link.
          </p>
          <p className="py-2 text-base text-gray-800">
            Sorry about that! Please visit our hompage to get where you need to
            go.
          </p>
          <Link to="/">
              <button className="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-[#9538E2] text-white hover:bg-[#7a33b5]">
                Go back to Homepage
              </button>
          </Link>
        </div>
      </div>
    </>
  );
}
