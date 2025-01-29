import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "../../../Hooks/use-toast";

const UpdateParcel = () => {
  const { id } = useParams();
  const productid = id;
  const axiosSecure = useAxiosSecure();
  const [singleParcel, setsingleParcel] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get(`/my-parcel/get-one-percel/${productid}`).then((res) => {
      setsingleParcel(res.data);
    });
  }, []);

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

  const parcelWeightValue = watch("parcelWeight", 0);
  const [finalPrice, setfinalPrice] = useState();

  useEffect(() => {
    if (parcelWeightValue <= 2) setfinalPrice(parseInt(parcelWeightValue * 50));
    else if (parcelWeightValue >= 2) {
      setfinalPrice(150);
    }
  }, [parcelWeightValue]);

  const onSubmit = async (data) => {
    data.price = finalPrice;
    console.log(data);
    await axiosSecure.patch(`/update-parcel/${productid}`, data);
    toast({
      title: <span style={{ color: "#00D26A" }}>Updated!</span>,
      description: "Your parcel has been updated successfully",
      variant: "default",
      className: "bg-[black] text-white shadow-lg",
      style: {
        padding: "16px",
      },
      duration: 2000,
    });
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
                    value={finalPrice}
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
                Update Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateParcel;

/* 
<div>
        <div className="hero bg-base-200">
          <div className="hero-content flex-col w-full">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-bold">Update info parcel</h1>
            </div>
            <div className="card bg-base-100 w-full  shrink-0 shadow-2xl border border-black">
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="card-body grid grid-cols-3">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      className="input input-bordered"
                      {...register("name", { required: "Name is required" })}
                      readOnly
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      className="input input-bordered"
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input
                      className="input input-bordered"
                      {...register("phonenumber", {
                        required: "phonenumber is required",
                      })}
                    />
                    {errors.phonenumber && <p>{errors.phonenumber.message}</p>}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Parcel Type</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered"
                      {...register("parcelType", {
                        required: "phone number is required",
                      })}
                    />
                    {errors.parcelType && <p>{errors.parcelType.message}</p>}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Parcel Weight</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered"
                      {...register("parcelWeight", {
                        required: "Parcel Weight is required",
                        valueAsNumber: true,
                      })}
                    />
                    {errors.parcelWeight && (
                      <p>{errors.parcelWeight.message}</p>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Receiver's Phone Number
                      </span>
                    </label>
                    <input
                      className="input input-bordered"
                      {...register("receiverPhoneNumber", {
                        required: "Receiver's Phone Number is required",
                      })}
                    />
                    {errors.receiverPhoneNumber && (
                      <p>{errors.receiverPhoneNumber.message}</p>
                    )}
                  </div>
                  <div className="form-control col-span-2">
                    <label className="label">
                      <span className="label-text">
                        Parcel Delivery Address
                      </span>
                    </label>
                    <textarea
                      className="border border-black"
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      {...register("parcelDeliveryAddress", {
                        required: "Parcel Delivery Address is required",
                      })}
                    ></textarea>
                    {errors.parcelDeliveryAddress && (
                      <p>{errors.parcelDeliveryAddress.message}</p>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Requested Delivery Date
                      </span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered"
                      {...register("requestedDeliveryDate", {
                        required: "Requested Delivery Date is required",
                      })}
                    />
                    {errors.requestedDeliveryDate && (
                      <p>{errors.requestedDeliveryDate.message}</p>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Delivery Address Latitude
                      </span>
                    </label>
                    <input
                      type="number"
                      step="any" // Allow any decimal precision for input
                      className="input input-bordered"
                      {...register("deliveryAddressLatitude", {
                        required: "Delivery Address Latitude is required",
                        valueAsNumber: true,
                      })}
                    />

                    {errors.deliveryAddressLatitude && (
                      <p>{errors.deliveryAddressLatitude.message}</p>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Delivery Address Longitude
                      </span>
                    </label>
                    <input
                      type="number"
                      step="any" // Allow any decimal precision for input
                      className="input input-bordered"
                      {...register("deliveryAddressLongitude", {
                        required: "Delivery Address Longitude is required",
                        valueAsNumber: true,
                      })}
                    />

                    {errors.deliveryAddressLongitude && (
                      <p>{errors.deliveryAddressLongitude.message}</p>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Price</span>
                    </label>
                    <input
                      value={finalPrice}
                      className="input input-bordered"
                      {...register("price")}
                      readOnly
                    />
                    {errors.price && <p>{errors.price.message}</p>}
                  </div>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-neutral">Update Info</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */
