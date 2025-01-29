import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ComponentContext } from "@/Provider/ComponentProvider";

const BookParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { toastMessage } = useContext(ComponentContext);
  const navigate = useNavigate();
  const { role } = useRole();

  const { data: userData = [] } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-info/${user?.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", userData?.name);
    setValue("email", userData?.email);
    setValue("phonenumber", userData?.phonenumber);
  }, [userData, setValue]);

  const { mutateAsync: addParcel, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.post("/add-parcel", data);
      return response.data;
    },
  });

  const { mutateAsync: updateUserData } = useMutation({
    mutationFn: async (objInfo) => {
      const response = await axiosSecure.patch(
        `/update-user-data/${user?.email}`,
        objInfo
      );
      return response.data;
    },
  });

  const onSubmit = async (data) => {
    data.status = "pending";
    data.bookingDate = new Date().toISOString().split("T")[0];

    await addParcel(data);
    const objInfo = { role: role, price: data.price };
    await updateUserData(objInfo);

    reset();
    setValue("name", userData?.name);
    setValue("email", userData?.email);
    setValue("phonenumber", userData?.phonenumber);

    toastMessage(
      "Success",
      "Your parcel has been booked successfully.",
      "#0E7537",
      "#D6FAE4"
    );
    navigate("/dashboard/myparcel");
  };

  const parcelWeightValue = watch("parcelWeight");
  useEffect(() => {
    setValue(
      "price",
      parcelWeightValue > 2 ? 150 : parcelWeightValue * 50 || 0,
      { shouldValidate: true }
    );
  }, [parcelWeightValue]);

  return (
    <div className="min-h-screen  py-8 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book a Parcel</h1>
          <p className=" text-gray-600">
            Fill in the details to book your parcel delivery
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 text-black"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E83434] focus:border-transparent outline-none transition"
                    {...register("name", { required: "Name is required" })}
                    readOnly
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E83434] focus:border-transparent outline-none transition"
                    {...register("email", { required: "Email is required" })}
                    readOnly
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E83434] focus:border-transparent outline-none transition"
                    {...register("phonenumber", {
                      required: "Phone number is required",
                    })}
                  />
                  {errors.phonenumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phonenumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Parcel Information Section */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Parcel Type
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E83434] focus:border-transparent outline-none transition"
                    {...register("parcelType", {
                      required: "Parcel type is required",
                    })}
                  />
                  {errors.parcelType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.parcelType.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Parcel Weight (kg)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E83434] focus:border-transparent outline-none transition"
                    {...register("parcelWeight", {
                      required: "Parcel weight is required",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.parcelWeight && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.parcelWeight.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    // value={finalPrice}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    {...register("price")}
                    readOnly
                  />
                </div>
              </div>

              {/* Receiver Information Section */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Receiver's Name
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E83434] focus:border-transparent outline-none transition"
                    {...register("receiversName", {
                      required: "Receiver's name is required",
                    })}
                  />
                  {errors.receiversName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiversName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Receiver's Phone
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E83434] focus:border-transparent outline-none transition"
                    {...register("receiverPhoneNumber", {
                      required: "Receiver's phone is required",
                    })}
                  />
                  {errors.receiverPhoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiverPhoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery Information Section */}
              <div className="space-y-6 col-span-full md:col-span-2 lg:col-span-3">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E83434] focus:border-transparent outline-none transition h-32 resize-none"
                    {...register("parcelDeliveryAddress", {
                      required: "Delivery address is required",
                    })}
                  ></textarea>
                  {errors.parcelDeliveryAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.parcelDeliveryAddress.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Requested Delivery Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E83434] focus:border-transparent outline-none transition"
                      {...register("requestedDeliveryDate", {
                        required: "Delivery date is required",
                      })}
                    />
                    {errors.requestedDeliveryDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.requestedDeliveryDate.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E83434] focus:border-transparent outline-none transition"
                      {...register("deliveryAddressLatitude", {
                        required: "Latitude is required",
                        valueAsNumber: true,
                      })}
                    />
                    {errors.deliveryAddressLatitude && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.deliveryAddressLatitude.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E83434] focus:border-transparent outline-none transition"
                      {...register("deliveryAddressLongitude", {
                        required: "Longitude is required",
                        valueAsNumber: true,
                      })}
                    />
                    {errors.deliveryAddressLongitude && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.deliveryAddressLongitude.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
              <button
                type="submit"
                className="px-6 w-full py-2 bg-[#E83434] text-white rounded-lg hover:bg-[#d42e2e] transition-colors"
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Add Food"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookParcel;
