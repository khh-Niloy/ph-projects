import axios from "axios";
import React, { isValidElement, useContext, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const Update = () => {
  const data = useLoaderData();
  const { isDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, setValue } = useForm();
  useEffect(() => {
    setValue("foodname", data.foodname);
    setValue("photo", data.photo);
    setValue("category", data.category);
    setValue("quantity", data.quantity);
    setValue("price", data.price);
    setValue("username", data.username);
    setValue("useremail", data.useremail);
    setValue("origin", data.origin);
    setValue("description", data.description);
  }, [data, setValue]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.put(
        `https://madchef-server-side.vercel.app/allfood/updatefood/${data._id}`,
        formData
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Updated");
      navigate("/myfood");
    },
  });

  const updateSubmit = async (formData) => {
    mutateAsync(formData);
  };

  return (
    <div>
      <div>
        <div
          className={`hero ${
            isDarkMode ? "bg-[#191A23]" : "bg-white"
          } pb-20 pt-5 duration-300`}
        >
          <div className="hero-content flex-col w-full">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold mb-3">
                Update your food information
              </h1>
            </div>
            <div
              className={`card bg-base-100 sm:w-[80%] shrink-0 shadow-2xl ${
                isDarkMode && "text-black"
              }`}
            >
              <form onSubmit={handleSubmit(updateSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Food Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Food Name"
                    {...register("foodname")}
                    // name="foodname"
                    // defaultValue={data.foodname}
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
                    // name="photo"
                    // defaultValue={data.photo}
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
                    step="0.01"
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
                    {...register("username")}
                    placeholder="Name"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("useremail")}
                    placeholder="Email"
                    className="input input-bordered"
                    required
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
                    className="border border-black/15 rounded-md p-3"
                  ></textarea>
                </div>
                <div className="form-control mt-6">
                  <button className="btn hover:bg-blue-600 hover:border-none btn-neutral text-white w-full mt-2">
                    {isPending ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
