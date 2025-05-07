"use client";
import { useState } from "react";
import { Eye } from "lucide-react";
import { Mail } from "lucide-react";
import { User } from "lucide-react";
import { Lock } from "lucide-react";
import { Image } from "lucide-react";
import { Phone } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter();

  const { register, handleSubmit } = useForm();

  async function regSubmit(data) {
    try {
      const res = await axios.post("/api/user-register", {
        ...data,
        role: "admin",
      });
      console.log(res);

      const loginRes = await signIn("credentials", {
        redirect: false,
        ...data,
      });
      console.log(loginRes);

      if (loginRes.ok) {
        navigate.push("/");
        toast.success("Registration Successfull");
      }
    } catch (error) {
      toast.success(error?.message);
    }
  }

  return (
    <div className="flex w-full pb-16">
      {/* Left side - Gray background */}
      <div className="w-[45%] bg-[black]/20"></div>

      {/* Right side - Login form */}
      <div className="w-[55%] flex items-center justify-center bg-white pt-20">
        <div className="w-full max-w-md px-8  ">
          <h1 className="text-xl font-medium text-gray-900 mb-1">
            Become a Member!
          </h1>
          <p className="text-gray-500 text-xs mb-6">
            Start managing your finance faster and better
          </p>

          <form
            onSubmit={handleSubmit(regSubmit)}
            className="w-[85%] space-y-2.5"
          >
            <div className="w-full space-y-2.5">
              <div className="flex items-center w-full px-2 py-2 bg-[#F5F7F9] rounded-lg">
                <span className="text-blue-500 mr-2 bg-white p-1.5 rounded-md">
                  <User size={14} />
                </span>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="your name"
                  className="flex-1 bg-transparent text-xs focus:outline-none text-black/90"
                />
              </div>
              <div className="flex items-center w-full px-2 py-2 bg-[#F5F7F9] rounded-lg">
                <span className="text-blue-500 mr-2 bg-white p-1.5 rounded-md">
                  <Image size={14} />
                </span>
                <input
                  {...register("image")}
                  type="url"
                  placeholder="your image"
                  className="flex-1 bg-transparent text-xs focus:outline-none text-black/90"
                />
              </div>
              <div className="flex items-center w-full px-2 py-2 bg-[#F5F7F9] rounded-lg">
                <span className="text-blue-500 mr-2 bg-white p-1.5 rounded-md">
                  <Phone size={14} />
                </span>
                <input
                  {...register("userPhoneNumber")}
                  type="number"
                  placeholder="your phone number"
                  className="flex-1 bg-transparent text-xs focus:outline-none text-black/90"
                />
              </div>
              <div className="flex items-center w-full px-2 py-2 bg-[#F5F7F9] rounded-lg">
                <span className="text-blue-500 mr-2 bg-white p-1.5 rounded-md">
                  <Mail size={14} />
                </span>
                <input
                  {...register("userEmail")}
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent text-xs focus:outline-none text-black/90"
                />
              </div>
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between w-full px-2 py-2 bg-[#F5F7F9] rounded-lg">
                <div className="flex items-center flex-1">
                  <span className="text-blue-500 mr-2 bg-white p-1.5 rounded-md">
                    <Lock size={14} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="At least 8 characters"
                    className="flex-1 bg-transparent focus:outline-none text-xs text-black/90"
                  />
                </div>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 focus:outline-none"
                >
                  <Eye size={14} />
                </button>
              </div>
            </div>

            <button className="w-full cursor-pointer bg-blue-500 text-xs text-white py-3 rounded-lg font-medium">
              Regsiter
            </button>

            <div className="flex items-center justify-center space-x-2">
              <span className="text-gray-500 text-sm">or</span>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                className="flex-1 flex items-center justify-center border border-gray-200 py-2 rounded-lg"
              >
                <FcGoogle className="text-xl"></FcGoogle>
                <span className="ml-2 text-sm font-medium">Google</span>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center w-[85%]">
            <span className="text-gray-500 text-xs">
              Already have an account?{" "}
            </span>
            <a href="#" className="text-blue-500 text-xs font-medium">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
