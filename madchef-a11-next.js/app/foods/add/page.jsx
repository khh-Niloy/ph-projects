"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContextProvider";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

const AddFood = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);

  function addFoodSubmit(data) {
    console.log(data);
  }

  const isDarkMode = false;
  const isPending = false;

  return (
    <div>
      <div
        className={`hero duration-300 ${
          isDarkMode ? "bg-[#191A23]" : "bg-white"
        } pb-20 pt-5`}
      >
        <div className="hero-content flex-col w-full">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold mb-3">Add New Food</h1>
          </div>
          <div
            className={`card bg-base-100 sm:w-[80%] shrink-0 duration-300 shadow-2xl ${
              isDarkMode && "text-black"
            }`}
          >
            <form onSubmit={handleSubmit(addFoodSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Food Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("foodname")}
                  className="input border border-black/15 w-full mt-2 rounded-lg"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black mt-2">Food Image</span>
                </label>
                <input
                  type="url"
                  placeholder="Image"
                  className="input border border-black/15 w-full mt-2 rounded-lg"
                  {...register("photo")}
                  required
                />
              </div>
              <div className="flex gap-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black mt-2">
                      Food Origin
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("origin")}
                    placeholder="Origin"
                    className="input border border-black/15 w-full mt-2 rounded-lg"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black mt-2">
                      Food Category
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("category")}
                    placeholder="Category"
                    className="input border border-black/15 w-full mt-2 rounded-lg"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black mt-2">Price</span>
                  </label>
                  <input
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                    placeholder="Price"
                    className="input border border-black/15 w-full mt-2 rounded-lg"
                    step="any"
                    required
                  />
                </div>
              </div>
              <div className="form-control flex gap-5">
                <div className="">
                  <label className="label">
                    <span className="label-text text-black mt-2">User Name</span>
                  </label>
                  <input
                    type="text"
                    value={user?.displayName}
                    {...register("username")}
                    placeholder="Name"
                    className="input border border-black/15 w-full mt-2 rounded-lg"
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text text-black mt-2">User Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("useremail")}
                    value={user?.email}
                    placeholder="Email"
                    className="input border border-black/15 w-full mt-2 rounded-lg"
                    required
                    readOnly
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black mt-2">
                    Description
                  </span>
                </label>
                <textarea
                  {...register("description")}
                  id=""
                  rows="3"
                  className="border w-full mt-2 resize-none border-black/15 rounded-md p-3 focus:outline-black/5"
                ></textarea>
              </div>
              <div className="form-control mt-6">
                {/* <button className="btn hover:bg-blue-600 hover:border-none btn-neutral text-white w-full mt-2">
                  {isPending ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "Add Food"
                  )}
                </button> */}
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer w-full bg-[#2B3440] hover:border-none hover:bg-[#E8252E] duration-300 text-white"
                >
                  Add Food
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
