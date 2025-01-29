import React from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";

const PaymentSuccessPage = () => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  return (
    <div className="py-10 flex flex-col items-center justify-center p-4">
      <Confetti
        width={width}
        height={height}
        numberOfPieces={300}
        gravity={0.05}
        colors={["#ff0f7b", "#f89b29", "#56ccf2", "#bb6bd9"]}
      />

      <div className="text-center space-y-6 max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          Payment Successful!
        </h1>

        <p className="text-gray-600">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        <button
          onClick={() => navigate("/dashboard/myparcel")}
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Return To Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
