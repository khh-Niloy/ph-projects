"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaRocket,
  FaEye,
  FaEyeSlash,
  FaPhone,
} from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  const [eyeIconClicked1, seteyeIconClicked1] = useState(false);
  const [eyeIconClicked2, seteyeIconClicked2] = useState(false);
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const imageFile = watch("image");
  if (imageFile?.[0] && !imagePreview) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(imageFile[0]);
  }

  async function regSubmit(data) {
    if (data.password !== data.confirmPassword)
      return toast.error("Please match the password");
    // using cloudinary
    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append("upload_preset", "my-uploads");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dwrvergmd/image/upload",
      formData
    );
    data.image = res.data.secure_url;
    try {
      const response = await axios.post("/api/auth/add-new-user", data);
      console.log(response.data);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Account creation failed");
    }
  }

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

            <form onSubmit={handleSubmit(regSubmit)} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Hasib Hossain Niloy"
                      className="w-full px-11 py-3 rounded-xl bg-gray-50/30 border border-gray-200 
                      focus:border-blue-600 
                     transition-all duration-300 text-sm placeholder:text-gray-400"
                      {...register("name", { required: "Name is required" })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="niloy@gmail.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50/30 border border-gray-200 
                      focus:border-blue-600 
                     transition-all duration-300 text-sm placeholder:text-gray-400"
                      {...register("email", { required: "Email is required" })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
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
                      {...register("phoneNumber", {
                        required: "Phone Number is required",
                      })}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    User Type
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="role"
                      id="role"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50/30 border border-gray-200 
                      focus:border-blue-600 
                     transition-all duration-300 text-sm placeholder:text-gray-400"
                      {...register("role", { required: "Role is required" })}
                    >
                      <option value="user">User</option>
                      <option value="deliveryman">Delivery Man</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Profile Image
                  </label>
                  <div className="relative bg-white shadow-sm rounded-xl p-4 border border-gray-100 hover:border-blue-300 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full border-2 border-blue-100 p-1 shadow-inner bg-white">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-full w-full object-cover rounded-full"
                          />
                        ) : (
                          <div className="h-full w-full rounded-full bg-blue-50 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <label
                          htmlFor="file-upload"
                          className="block cursor-pointer"
                        >
                          <div className="flex items-center justify-center px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg border border-dashed border-blue-200 transition-colors duration-200">
                            <span className="text-sm flex items-center font-medium text-blue-600">
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-blue-600 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                  />
                                </svg>
                              </span>{" "}
                              Upload image
                            </span>
                          </div>
                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            {...register("image", {
                              required: "Image is required",
                            })}
                          />
                        </label>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <span>JPG, PNG</span>
                          <span>•</span>
                          <span>Max 5MB</span>
                        </div>
                      </div>
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
                      type={eyeIconClicked1 ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-gray-50/30 border border-gray-200 
                      focus:border-blue-600 
                     transition-all duration-300 text-sm placeholder:text-gray-400"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />

                    <button
                      type="button"
                      onClick={() => seteyeIconClicked1(!eyeIconClicked1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                                                hover:text-gray-600 transition-colors"
                    >
                      {eyeIconClicked1 ? (
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
                      type={eyeIconClicked2 ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-gray-50/30 border border-gray-200 
                      focus:border-blue-600 
                     transition-all duration-300 text-sm placeholder:text-gray-400"
                      {...register("confirmPassword", {
                        required: "You have to match the password",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => seteyeIconClicked2(!eyeIconClicked2)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                      hover:text-gray-600 transition-colors"
                    >
                      {eyeIconClicked2 ? (
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
