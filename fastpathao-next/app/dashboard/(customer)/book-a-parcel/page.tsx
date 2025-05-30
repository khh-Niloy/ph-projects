"use client";

import { getLocation } from "@/lib/getLocation";
import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ParcelBook() {
  type ParcelFormInputs = {
    senderName: string;
    senderEmail: string;
    senderPhoneNumber: string;
    parcelType?: string;
    parcelWeight: number;
    deliveryCharge?: number;
    receiverName: string;
    receiverPhoneNumber: string;
    receiverEmail: string;
    deliveryAddress: string;
    requestedDeliveryDate: string;
  };

  type ParcelFormSubmitResponse = {
    message: string;
    status: number;
    error?: string;
  };

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ParcelFormInputs>({
    defaultValues: {
      senderName: "Hasib",
      senderEmail: "Hasib@gmail.com",
      parcelWeight: 0,
    },
  });

  const weight = watch("parcelWeight");
  useEffect(() => {
    let calcCharge = 0;

    if (weight < 1) {
      calcCharge = 0;
    } else if (weight < 2) {
      calcCharge = 50;
    } else if (weight === 2) {
      calcCharge = 100;
    } else if (weight > 2) {
      calcCharge = 150;
    }

    setValue("deliveryCharge", calcCharge);
  }, [setValue, weight]);

  async function submitBookParcel(data: ParcelFormInputs) {
    try {
      const { lat, lng } = await getLocation(data.deliveryAddress);
      const parcelInfo = {
        ...data,
        deliveryAddressLatitude: lat,
        deliveryAddressLongitude: lng,
        status: "pending",
        bookingDate: new Date(),
      };
      // console.log(parcelInfo);

      const response = await axios.post<ParcelFormSubmitResponse>(
        "/api/dashboard/book-parcel",
        parcelInfo
      );
      const result = await response.data;
      // console.log(result );
    } catch (error) {
      const err = error as AxiosError;
      console.error(err.message);
      throw new Error("Failed to submit parcel");
    }
  }

  return (
    <div>
      <h1>Book a parcel</h1>

      <form
        onSubmit={handleSubmit(submitBookParcel)}
        className="flex flex-col gap-5 w-[80%]"
      >
        <input
          {...register("senderName", { required: "senderName is required" })}
          type="text"
          placeholder="sender text"
        />
        {errors.senderName && (
          <p className="text-red-500">{errors.senderName.message}</p>
        )}

        <input
          {...register("senderEmail", { required: "senderEmail is required" })}
          type="email"
          placeholder="sender email"
        />
        {errors.senderEmail && (
          <p className="text-red-500">{errors.senderEmail.message}</p>
        )}

        <input
          {...register("senderPhoneNumber", {
            required: "senderPhoneNumber is required",
          })}
          type="number"
          placeholder="sender phoneNumber"
        />
        {errors.senderPhoneNumber && (
          <p className="text-red-500">{errors.senderPhoneNumber.message}</p>
        )}

        <input
          {...register("parcelType")}
          type="text"
          placeholder="ParcelType"
        />
        <input
          {...register("parcelWeight", { valueAsNumber: true, required: true })}
          type="number"
          step="0.01"
          placeholder="Parcel Weight (kg)"
        />
        {errors.parcelWeight && (
          <p className="text-red-500">{errors.parcelWeight.message}</p>
        )}

        <input
          {...register("deliveryCharge")}
          type="number"
          placeholder="Delivery Charge"
        />
        <input
          {...register("receiverName", {
            required: "receiverName is required",
          })}
          type="text"
          placeholder="Receiver's Name"
        />
        {errors.receiverName && (
          <p className="text-red-500">{errors.receiverName.message}</p>
        )}

        <input
          {...register("receiverPhoneNumber", {
            required: "receiverPhoneNumber is required",
          })}
          type="number"
          placeholder="Receiver's Phone"
        />
        {errors.receiverPhoneNumber && (
          <p className="text-red-500">{errors.receiverPhoneNumber.message}</p>
        )}

        <input
          {...register("receiverEmail", {
            required: "receiverEmail is required",
          })}
          type="email"
          placeholder="Receiver's Email"
        />
        {errors.receiverEmail && (
          <p className="text-red-500">{errors.receiverEmail.message}</p>
        )}

        <input
          {...register("deliveryAddress", {
            required: "deliveryAddress is required",
          })}
          type="text"
          placeholder="Delivery Address"
        />
        {errors.deliveryAddress && (
          <p className="text-red-500">{errors.deliveryAddress.message}</p>
        )}

        <input
          {...register("requestedDeliveryDate", {
            required: "requestedDeliveryDate is required",
          })}
          type="date"
          placeholder="Requested Delivery Date"
        />
        {errors.requestedDeliveryDate && (
          <p className="text-red-500">{errors.requestedDeliveryDate.message}</p>
        )}

        <button className="bg-blue-500">Submit</button>
      </form>
    </div>
  );
}
