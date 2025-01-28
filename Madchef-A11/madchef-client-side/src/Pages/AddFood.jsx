import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContextProvider";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import useAxiosSecure from "../Custom/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = () => {
    axiosSecure.get(
      `https://madchef-server-side.vercel.app/checkToken/${user?.email}`
    );
  };
  const { register, handleSubmit, reset } = useForm();

  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        `https://madchef-server-side.vercel.app/addfood`,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("New food item added successfully!");
      navigate("/myfood");
    },
  });

  const addFoodSubmit = async (data) => {
    data.purchase_count = 0;
    await mutateAsync(data);
  };

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
                  <span className="label-text">Food Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Food Name"
                  {...register("foodname")}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Image</span>
                </label>
                <input
                  type="url"
                  placeholder="Food Image"
                  className="input input-bordered"
                  {...register("photo")}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Category</span>
                </label>
                <input
                  type="text"
                  {...register("category")}
                  placeholder="Food Category"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  type="number"
                  {...register("quantity", { valueAsNumber: true })}
                  placeholder="Quantity"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="Price"
                  className="input input-bordered"
                  step="any"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Add By</span>
                </label>

                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  {...register("username")}
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  readOnly
                />
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("useremail")}
                  value={user?.email}
                  placeholder="Email"
                  className="input input-bordered"
                  required
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Origin</span>
                </label>
                <input
                  type="text"
                  {...register("origin")}
                  placeholder="Add By"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  {...register("description")}
                  id=""
                  cols="30"
                  rows="5"
                  className="border border-black/15 rounded-md p-3 focus:outline-black/15"
                ></textarea>
              </div>
              <div className="form-control mt-6">
                <button className="btn hover:bg-blue-600 hover:border-none btn-neutral text-white w-full mt-2">
                  {isPending ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "Add Food"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
