import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ComponentContext } from "@/Provider/ComponentProvider";

const UpdateParcel = () => {
  const { id } = useParams();
  const productid = id;
  const axiosSecure = useAxiosSecure();
  const { toastMessage } = useContext(ComponentContext);
  const navigate = useNavigate();

  const { data: singleParcel = [] } = useQuery({
    queryKey: ["singleParcel", productid],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-parcel/get-one-percel/${productid}`
      );
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", singleParcel?.name);
    setValue("email", singleParcel?.email);
    setValue("phonenumber", singleParcel?.phonenumber);
    setValue("parcelType", singleParcel?.parcelType);
    setValue("parcelWeight", singleParcel?.parcelWeight);
    setValue("receiverPhoneNumber", singleParcel?.receiverPhoneNumber);
    setValue("receiversName", singleParcel?.receiversName);
    setValue("parcelDeliveryAddress", singleParcel?.parcelDeliveryAddress);
    setValue("requestedDeliveryDate", singleParcel?.requestedDeliveryDate);
    setValue("deliveryAddressLatitude", singleParcel?.deliveryAddressLatitude);
    setValue(
      "deliveryAddressLongitude",
      singleParcel?.deliveryAddressLongitude
    );
  }, [singleParcel, setValue]);

  const parcelWeightValue = watch("parcelWeight");
  useEffect(() => {
    setValue(
      "price",
      parcelWeightValue > 2 ? 150 : parcelWeightValue * 50 || 0,
      { shouldValidate: true }
    );
  }, [parcelWeightValue]);

  const { mutateAsync: updateParcelInfo, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.patch(
        `/update-parcel/${productid}`,
        data
      );
      return response.data;
    },
  });

  const onSubmit = async (data) => {
    await updateParcelInfo(data);
    toastMessage(
      "Updated",
      "Your parcel has been updated successfully.",
      "#285192",
      "#E3EBF7"
    );
    navigate("/dashboard/myparcel");
  };

  return (
    <div className="min-h-screen  py-8 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Update Parcel Information
          </h1>
          <p className=" text-gray-600">Modify Delivery Details with Ease</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  "Update Information"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateParcel;
