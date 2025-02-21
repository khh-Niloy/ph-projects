"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaRocket,
  FaEye,
  FaEyeSlash,
  FaPhone,
} from "react-icons/fa";
import { BsArrowRightCircle, BsShieldCheck } from "react-icons/bs";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  const [eyeIconClicked, seteyeIconClicked] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 ${inter.className}`}
    >
      <div className="container mx-auto px-4 py-16 flex lg:flex-row flex-col-reverse items-start justify-center gap-20">
        {/* Left Side - Benefits */}
        <div className="lg:w-[41%] w-full">
          <div className="px-10">
            {/* Header */}
            <div className="space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white font-medium text-sm">
                  Start Your Journey
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                Join ParcelPro's{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                  Delivery Network
                </span>{" "}
                Today and Transform
              </h1>
              <p className="text-gray-600 text-base leading-relaxed max-w-lg">
                Transform your business operations with our enterprise-grade
                platform
              </p>
            </div>

            {/* Benefits Section with Animation */}
            <div className="space-y-7 mb-8">
              <div className="transform hover:scale-[1.02] transition-all duration-300 group cursor-default">
                <div className="flex items-center gap-5 transition-all">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl group-hover:scale-110 transition-all duration-300">
                    <FaRocket className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base mb-1">
                      Instant Setup
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Get started in minutes with our streamlined onboarding
                      process
                    </p>
                  </div>
                </div>
              </div>

              <div className="transform hover:scale-[1.02] transition-all duration-300 group cursor-default">
                <div className="flex items-center gap-5 transition-all">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl group-hover:scale-110 transition-all duration-300">
                    <BsShieldCheck className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base mb-1">
                      Enterprise Security
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      ISO 27001 certified with end-to-end encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-left">
                  <div className="text-2xl font-bold text-blue-500 mb-1">
                    500K+
                  </div>
                  <div className="text-xs text-gray-600">Deliveries/Month</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-blue-500 mb-1">
                    2,000+
                  </div>
                  <div className="text-xs text-gray-600">Delivery Partners</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-blue-500 mb-1">
                    98%
                  </div>
                  <div className="text-xs text-gray-600">On-time Delivery</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-blue-500 mb-1">
                    50+
                  </div>
                  <div className="text-xs text-gray-600">Cities Covered</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="lg:w-[33%] w-full max-w-md">
          <div className="bg-white/95 shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-gray-100 rounded-2xl p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Create Your Account 🚀
              </h2>
              <p className="text-gray-600 text-sm">
                Join thousands of industry leaders
              </p>
            </div>

            {/* Google Sign Up Button */}
            <button
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 
                            py-3 rounded-xl hover:bg-gray-50 mb-6 transition-all duration-300 group"
            >
              <FcGoogle className="text-xl group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[15px] text-gray-700 font-medium">
                Sign up with Google
              </span>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400 text-sm">
                  or register with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-11 py-3 rounded-xl bg-gray-50/30 border border-gray-200 
                      focus:border-blue-600 
                     transition-all duration-300 text-sm placeholder:text-gray-400"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="name@company.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50/30 border border-gray-200 
                      focus:border-blue-600 
                     transition-all duration-300 text-sm placeholder:text-gray-400"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      placeholder="019159**291"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50/30 border border-gray-200 
                      focus:border-blue-600 
                     transition-all duration-300 text-sm placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Profile Image
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-5 text-gray-400" />
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50/30 border border-gray-200 
                      focus:border-blue-600 file:mr-4 file:py-2.5 file:px-4
                      file:rounded-full file:border-0 file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100 file:cursor-pointer
                      hover:border-blue-300 focus:ring-2 focus:ring-blue-200
                      transition-all duration-300 text-sm"
                    />
                    <div className="flex items-center gap-2 mt-2 ml-2">
                      <span className="text-xs text-gray-500">
                        Supported formats: JPG, PNG, GIF
                      </span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-xs text-gray-500">Max size: 5MB</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={eyeIconClicked ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-gray-50/30 border border-gray-200 
                      focus:border-blue-600 
                     transition-all duration-300 text-sm placeholder:text-gray-400"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => seteyeIconClicked(!eyeIconClicked)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                                                hover:text-gray-600 transition-colors"
                    >
                      {eyeIconClicked ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={eyeIconClicked ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-gray-50/30 border border-gray-200 
                      focus:border-blue-600 
                     transition-all duration-300 text-sm placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => seteyeIconClicked(!eyeIconClicked)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                                                hover:text-gray-600 transition-colors"
                    >
                      {eyeIconClicked ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </div>
                </div>

              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white mt-8 py-3.5 rounded-xl
                                    font-semibold text-[15px] hover:opacity-95 transform transition-all duration-300
                                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2
                                    shadow-[0_6px_20px_rgba(37,99,235,0.18)]"
              >
                Create Account
                <BsArrowRightCircle className="text-xl" />
              </button>
            </form>

            <p className="text-center text-gray-600 text-sm mt-8">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                Sign in instead
              </Link>
            </p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500 leading-relaxed">
                By creating an account, you agree to our{" "}
                <Link
                  href="#"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
