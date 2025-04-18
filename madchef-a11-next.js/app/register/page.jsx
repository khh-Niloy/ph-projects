"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const res = await axios.post("/api/user-register", {
        ...data,
        role: "user",
      });
      console.log(res.data);
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
        <label htmlFor="">Photo</label>
        <input {...register("photo")} className="border" type="text" />
        <br />
        <label htmlFor="">Password</label>
        <input className="border" type="password" /> <br />
        <Button variant="outline" size="sm" className=" cursor-pointer">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
