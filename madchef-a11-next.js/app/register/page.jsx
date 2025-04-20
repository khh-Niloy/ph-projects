"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContextProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import ImageShow from "@/components/ImageShow";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserInfo } = useContext(AuthContext);
  const navigate = useRouter();

  async function onSubmit(data) {
    try {
      const { password, ...others } = data;
      await createUser(data.email, password);
      await updateUserInfo(data.name, data.photo);

      let hashedPassword = await bcrypt.hash(password, 10);

      const res = await axios.post("/api/user-register", {
        ...others,
        password: hashedPassword,
        role: "user",
      });
      console.log(res);
      if (res.data.insertedId) {
        toast.success("Created your account!");
        navigate.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const isClicked = false;

  return (
    <div className="flex items-center flex-col justify-center pt-8 pb-32">
      <div className="mb-5 text-center py-5">
        <h1 className="text-3xl font-bold">Create Your Account </h1>
        <p className="text-xs">Register below to get started.</p>
      </div>
      <div className="w-[75%] grid grid-cols-12">
        <div className="col-span-5 rounded-l-2xl">
          <ImageShow></ImageShow>
        </div>

        <div className="col-span-7 rounded-r-2xl">
          <div className=" md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-none md:rounded-tl-none rounded-2xl px-8 bg-white">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between gap-3">
                <div className="gap-1 flex flex-col w-full">
                  <h1 className="text-sm">Name:</h1>
                  <input
                    {...register("name")}
                    className="border border-black/20 rounded-md text-sm px-2 py-1 focus:outline-0"
                    type="text"
                  />
                </div>
                <div className="gap-1 flex flex-col w-full">
                  <h1 className="text-sm">Email:</h1>
                  <input
                    {...register("email")}
                    className="border border-black/20 rounded-md text-sm px-2 py-1 focus:outline-0"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-3">
                <div className="gap-1 flex flex-col mt-3 w-full">
                  <h1 className="text-sm">Phone Number:</h1>
                  <input
                    {...register("phoneNumber")}
                    className="border border-black/20 rounded-md text-sm   px-2 py-1 focus:outline-0"
                    type="number"
                  />
                </div>
                <div className="gap-1 flex flex-col mt-3 w-full">
                  <h1 className="text-sm">Photo</h1>
                  <input
                    {...register("photo")}
                    className="border border-black/20 rounded-md text-md px-2 py-1 focus:outline-0"
                    type="text"
                  />
                </div>
              </div>
              <div className="gap-1 flex flex-col mt-3">
                <h1 className="text-sm">Password</h1>
                <input
                  {...register("password")}
                  className="border border-black/20 rounded-md text-md px-2 py-1 focus:outline-0"
                  type="password"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="py-5 mt-7 mb-5 rounded-xl flex items-center justify-center hover:shadow-xl hover:scale-[1.01] duration-300 w-full bg-[#E8252E] text-white hover:bg-[#E8252E]"
              >
                Register
              </Button>
            </form>

            <h1 className="mb-3 text-sm text-black/80">
              Or sign up with Google
            </h1>

            <div className="flex flex-col">
              <button
                onClick={() => {
                  handleGoogle();
                }}
                className="py-2 rounded-xl flex items-center justify-center border border-black/30 hover:shadow-xl hover:scale-[1.01] duration-300"
              >
                <FcGoogle className="text-2xl"></FcGoogle>{" "}
                <h1 className="ml-1 text-black">Google</h1>
              </button>
              <div className="flex items-center mt-4 text-md gap-2">
                <h1 className="text-sm text-black/80">
                  Already have an account?
                </h1>
                <Link href="/login">
                  <h1 className="font-bold text-md text-[#E8252E] cursor-pointer">
                    Register
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
