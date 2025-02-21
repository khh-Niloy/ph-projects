"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsCheckCircleFill, BsArrowRightCircle } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [eyeIconClicked, seteyeIconClicked] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 ${inter.className}`}
    >
      <div className="container mx-auto px-4 py-16 flex lg:flex-row flex-col-reverse items-start justify-center gap-20">
        {/* Left Side - Benefits */}
        <div className="lg:w-[41%] w-full">
          <div className=" px-10 ">
            {/* Header */}
            <div className="space-y-4 mb-7">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white font-medium text-sm">
                  Enterprise Solution
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Meet<span className="text-blue-600 relative"> ParcelPro</span>, Ultimate Delivery Management Solution
              </h1>
              <p className="text-gray-600 text-base leading-relaxed max-w-lg">
                Experience enterprise-grade delivery management with advanced
                tracking and analytics
              </p>
            </div>

            {/* Benefits Section */}
            <div className="space-y-6 mb-8">
              <div className="transform hover:scale-[1.02] transition-all duration-300 group cursor-default">
                <div className="flex items-center gap-5">
                  <div className="bg-blue-600/5 p-4 rounded-xl group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                    <BsCheckCircleFill className="text-blue-600 text-2xl group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base mb-1 group-hover:text-blue-600 transition-colors">
                      Advanced Tracking System
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Military-grade GPS tracking with predictive ETA and
                      real-time notifications
                    </p>
                  </div>
                </div>
              </div>

              <div className="transform hover:scale-[1.02] transition-all duration-300 group cursor-default">
                <div className="flex items-center gap-5">
                  <div className="bg-blue-600/5 p-4 rounded-xl group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                    <BsCheckCircleFill className="text-blue-600 text-2xl group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base mb-1 group-hover:text-blue-600 transition-colors">
                      Enterprise Security
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Bank-grade encryption with multi-factor authentication and
                      audit logs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-8 mb-9">
              <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-shadow">
                <div className="text-2xl font-bold text-blue-500 mb-1">
                  99.9%
                </div>
                <div className="text-xs font-medium text-gray-600">
                  Success Rate
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-shadow">
                <div className="text-2xl font-bold text-blue-500 mb-1">
                  24/7
                </div>
                <div className="text-xs font-medium text-gray-600">
                  Expert Support
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-shadow">
                <div className="text-2xl font-bold text-blue-500 mb-1">
                  50K+
                </div>
                <div className="text-xs font-medium text-gray-600">
                  Active Users
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">
                    Trusted by Fortune 500 companies
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="px-3 py-1 bg-blue-50 rounded-full">
                    <span className="text-xs font-medium text-blue-700">
                      Uber
                    </span>
                  </div>
                  <div className="px-3 py-1 bg-blue-50 rounded-full">
                    <span className="text-xs font-medium text-blue-700">
                      GDPR Ready
                    </span>
                  </div>
                  <div className="px-3 py-1 bg-blue-50 rounded-full">
                    <span className="text-xs font-medium text-blue-700">
                      SOC 2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-[32%] w-full max-w-md">
          <div className="bg-white/95 shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-gray-100 rounded-2xl p-10 backdrop-blur-sm">
            <div className="text-center mb-7">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Welcome Back 👋
              </h1>
              <p className="text-sm text-gray-500">
                Please enter your credentials to sign in
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 
                py-3 rounded-xl hover:bg-gray-50 mb-6 transition-all duration-300 group"
            >
              <FcGoogle className="text-xl group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[15px] text-gray-700 font-medium">
                Continue with Google
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400 text-sm">
                  or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50/30 border border-gray-200 
                       focus:border-blue-600 
                      transition-all duration-300 text-sm placeholder:text-gray-400"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={eyeIconClicked ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-5 py-3 rounded-xl bg-gray-50/30 border border-gray-200 
                    focus:border-blue-600 
                   transition-all duration-300 text-sm placeholder:text-gray-400"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setformData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => seteyeIconClicked(!eyeIconClicked)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                      hover:text-gray-600 transition-colors p-1"
                  >
                    {eyeIconClicked ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 group cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-md border-2 border-gray-200 text-blue-600 
                      focus:ring-blue-600 focus:ring-offset-0 cursor-pointer 
                      transition-colors duration-200"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Remember me
                  </span>
                </label>
                <Link
                  href="/forget"
                  className="text-sm text-red-500 font-medium 
                    transition-colors duration-200 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white mt-8 py-3.5 rounded-xl font-semibold text-[15px]
                  hover:bg-blue-700 transform transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  shadow-[0_6px_20px_rgba(37,99,235,0.18)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.28)]"
              >
                Sign in to your account
                <BsArrowRightCircle className="inline-block ml-2 text-xl" />
              </button>
            </form>

            {/* Register Link */}
            <p className="text-center text-gray-600 text-sm mt-8">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold 
                  transition-colors duration-200 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
