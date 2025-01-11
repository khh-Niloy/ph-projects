import React, { useEffect, useState } from "react";
// import { Home } from 'lucide-react';
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const naviagte = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#212121]">
      {/* Small Animated Circles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-blue-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-${i} ${
                Math.random() * 8 + 4
              }s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Glowing Lines */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${i * 20}%`,
              background:
                "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent)",
              animation: `scan ${4 + i}s infinite linear`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div
          className={`w-full max-w-3xl text-center ${
            isLoaded ? "animate-fade-in" : "opacity-0"
          }`}
        >
          {/* 404 Text with Enhanced Size */}
          <div className="relative mb-8">
            <h1 className="text-[80px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 animate-gradient-x">
              404
            </h1>
            <div className="absolute inset-0 text-[80px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 blur-3xl animate-pulse opacity-50">
              404
            </div>
          </div>

          {/* Content Container */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-5xl font-bold text-white mb-6">
              Page Not Found
            </h2>
            <p className="text-2xl text-gray-300 mb-12">
              The page you're looking for has drifted into another dimension.
            </p>

            {/* Single Centered Button */}
            <button
              onClick={() => naviagte("/")}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl space-x-3 hover:scale-105 transition-all duration-300"
            >
              <AiFillHome className="w-6 h-6 text-white" />
              <span className="text-xl text-white font-semibold">
                Return Home
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse opacity-50 blur-xl -z-10" />
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateX(-100%) scaleX(0.5);
            opacity: 0;
          }
          50% {
            transform: translateX(0%) scaleX(1);
            opacity: 1;
          }
          100% {
            transform: translateX(100%) scaleX(0.5);
            opacity: 0;
          }
        }

        ${[...Array(15)]
          .map(
            (_, i) => `
          @keyframes float-${i} {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(${Math.random() * 50 - 25}px, ${
              Math.random() * 50 - 25
            }px) scale(${Math.random() * 0.5 + 1}); }
          }
        `
          )
          .join("\n")}

        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 15s linear infinite;
        }

        @keyframes gradient-x {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 0%;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;