"use client";

import React, { useState } from "react";
import getImageCloudinary from "@/lib/getImageCloudinary";
import { useForm } from "react-hook-form";

export default function Register() {
  const [image, setimage] = useState(null);
  const [showImagePreview, setshowImagePreview] = useState(null);

  function handleImageUpload(e) {
    setshowImagePreview(URL.createObjectURL(e.target.files[0]));
    setimage(e.target.files[0]);
  }

  const { register, handleSubmit } = useForm();

  async function submitForm(data) {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    try {
      const imageUrl = await getImageCloudinary(formData);
      // console.log(imageUrl);

      const userObj = {
        ...data,
        image: imageUrl.res,
        role: "customer",
        number_of_parcel_booked: 0,
        total_spent_amount: 0,
        isAppliedForDeliveryman: false,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObj),
        }
      );
      const responseData = await response.json();
      console.log(responseData);

      localStorage.setItem("access-token", responseData.accessToken);

      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-black text-white h-screen flex items-center justify-center flex-col gap-5">
      <h1>Register</h1>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col items-start justify-center gap-5"
      >
        <input {...register("name")} placeholder="name" type="text" />
        <input {...register("email")} placeholder="email" type="email" />
        <input
          {...register("phoneNumber")}
          placeholder="phoneNumber"
          type="phoneNumber"
        />

        <input
          type="file"
          name="image"
          className="border border-white/30 p-3 rounded-xl"
          id=""
          onChange={handleImageUpload}
        />
        {showImagePreview && (
          <img className="w-32 h-32" src={showImagePreview}></img>
        )}
        <button className="px-3 py-2 text-md rounded-md bg-blue-500">
          submit
        </button>
      </form>
    </div>
  );
}
