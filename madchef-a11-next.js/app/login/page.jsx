"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContextProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser } = useContext(AuthContext);
  const navigate = useRouter();

  async function onSubmit({ email, password }) {
    try {
      await signInUser(email, password);
      navigate.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      Login
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Email</label>
        <input {...register("email")} className="border" type="text" />
        <br />
        <label htmlFor="">Password</label>
        <input
          {...register("password")}
          className="border"
          type="password"
        />{" "}
        <br />
        <Button variant="outline" size="sm" className=" cursor-pointer">
          Login
        </Button>
        <Link href={"/register"}>
          <h1>Register</h1>
        </Link>
      </form>
    </div>
  );
};

export default Login;
