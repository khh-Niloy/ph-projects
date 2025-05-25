"use client";

import { getLocation } from "@/lib/getLocation";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ParcelBook() {
  const { register, setValue, handleSubmit, watch } = useForm({
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
  }, [weight]);

  async function submitBookParcel(data) {
    const { lat, lng } = await getLocation(data.deliveryAddress);
    const parcelInfo = {
      ...data,
      deliveryAddressLatitude: lat,
      deliveryAddressLongitude: lng,
      status: "pending",
      bookingDate: new Date(),
      assignedDeliveryManID: null,
      paymentStatus: null,
      approximateDeliveryDate: null,
    };
    // console.log(parcelInfo);

    const response = await axios.post("/api/dashboard/book-parcel", parcelInfo);
    const data2 = await response.data;
    console.log(data2);
  }

  return (
    <div>
      <h1>Book a parcel</h1>

      <form
        onSubmit={handleSubmit(submitBookParcel)}
        className="flex flex-col gap-5 w-[80%]"
      >
        <input
          {...register("senderName")}
          type="text"
          placeholder="sender text"
        />
        <input
          {...register("senderEmail")}
          type="email"
          placeholder="sender email"
        />
        <input
          {...register("senderPhoneNumber")}
          type="number"
          placeholder="sender phoneNumber"
        />
        <input
          {...register("parcelType")}
          type="text"
          placeholder="ParcelType"
        />
        <input
          {...register("parcelWeight", { valueAsNumber: true })}
          type="number"
          step="0.01"
          placeholder="Parcel Weight (kg)"
        />
        <input
          {...register("deliveryCharge")}
          type="number"
          placeholder="Delivery Charge"
        />
        <input
          {...register("receiverName")}
          type="text"
          placeholder="Receiver's Name"
        />
        <input
          {...register("receiverPhoneNumber")}
          type="number"
          placeholder="Receiver's Phone"
        />
        <input
          {...register("receiverEmail")}
          type="email"
          placeholder="Receiver's Email"
        />
        <input
          {...register("deliveryAddress")}
          type="text"
          placeholder="Delivery Address"
        />
        <input
          {...register("requestedDeliveryDate")}
          type="date"
          placeholder="Requested Delivery Date"
        />

        <button className="bg-blue-500">Submit</button>
      </form>
    </div>
  );
}
