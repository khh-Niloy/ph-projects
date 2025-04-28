"use client";

import { Button } from "@/components/ui/button";
// import { AuthContext } from "@/context/AuthContextProvider";
import { getFood } from "@/lib/getFood";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// setselectedFoodID
const ModalBtn = ({ modalId, setselectedFoodID, isClicked, setIsClicked }) => {
  const { register, handleSubmit, setValue } = useForm();
  const session = useSession();

  useEffect(() => {
    if (isClicked) {
      const fetchData = async () => {
        const foodData = await getFood(setselectedFoodID);
        setValue("foodname", foodData.foodname);
        setValue("photo", foodData.photo);
        setValue("category", foodData.category);
        setValue("price", foodData.price);
        setValue("origin", foodData.origin);
        setValue("description", foodData.description);
      };
      setIsClicked(false);
      fetchData();
    }
  }, [isClicked, setselectedFoodID, setValue]);

  async function updateFoodSubmit(data) {
    const res = await axios.patch(
      `http://localhost:3000/api/foods/${setselectedFoodID}`,
      {
        ...data,
        updateDate: new Date(),
      }
    );
  }

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box bg-white rounded-lg">
        <form onSubmit={handleSubmit(updateFoodSubmit)} className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">
                Food Name ${setselectedFoodID}
              </span>
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
                <span className="label-text text-black mt-2">Food Origin</span>
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
                value={session?.data?.user?.name}
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
                value={session?.data?.user?.email}
                placeholder="Email"
                className="input border border-black/15 w-full mt-2 rounded-lg"
                required
                readOnly
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black mt-2">Description</span>
            </label>
            <textarea
              {...register("description")}
              id=""
              rows="2"
              className="border w-full mt-2 resize-none border-black/15 rounded-md p-3 focus:outline-black/5"
            ></textarea>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="w-full bg-[#2B3440] hover:border-none hover:bg-[#E8252E] duration-300 text-white"
          >
            Save Changes
          </Button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ModalBtn;

{
  /* <dialog id={modalId} className="modal">
  <div className="modal-box bg-white rounded-lg">
    <form onSubmit={handleSubmit(updateFoodSubmit)} className="">
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
            <span className="label-text text-black mt-2">Food Origin</span>
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
            value={session?.data?.user?.name}
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
            value={session?.data?.user?.email}
            placeholder="Email"
            className="input border border-black/15 w-full mt-2 rounded-lg"
            required
            readOnly
          />
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-black mt-2">Description</span>
        </label>
        <textarea
          {...register("description")}
          id=""
          rows="2"
          className="border w-full mt-2 resize-none border-black/15 rounded-md p-3 focus:outline-black/5"
        ></textarea>
      </div>
    </form>

    <div className="modal-action w-full mt-4">
      <form method="dialog" className="w-full modal-backdrop">
        <Button
          type="submit"
          variant="outline"
          size="lg"
          className="w-full bg-[#2B3440] hover:border-none hover:bg-[#E8252E] duration-300 text-white"
        >
          Save Changes
        </Button>
      </form>
    </div>
  </div>
</dialog> */
}
