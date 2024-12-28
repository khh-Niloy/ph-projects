import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  function handleBackToHome() {
    navigate("/");
  }
  return (
    <div
      id="error-page"
      className="flex flex-col justify-center items-center h-screen"
    >
      <h1 className="text-7xl font-semibold">{error?.status}</h1>
      <p className="mt-2 text-center">Oops! something wrong!</p>
      <h1 className="text-sm font-semibold">{error?.error?.message}</h1>
      <button
        onClick={handleBackToHome}
        className="bg-[#007CF5] shadow-xl px-4 py-2 rounded-full text-sm mt-5 text-white"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
