"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContextProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";

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

  return (
    <div>
      Register
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Name</label>
        <input {...register("name")} className="border" type="text" />
        <br />
        <label htmlFor="">Email</label>
        <input {...register("email")} className="border" type="text" />
        <br />
        <label htmlFor="">Phone Number</label>
        <input {...register("phoneNumber")} className="border" type="number" />
        <br />
        <label htmlFor="">Photo</label>
        <input {...register("photo")} className="border" type="text" />
        <br />
        <label htmlFor="">Password</label>
        <input
          {...register("password")}
          className="border"
          type="password"
        />{" "}
        <br />
        <Button variant="outline" size="sm" className=" cursor-pointer">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
