"use client";

import { getParcelByID } from "@/lib/customer/getParcelByID";
import { getLocation } from "@/lib/getLocation";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function UpdateParcelInfo() {
  const [parcelInfoDB, setparcelInfoDB] = useState(null);
  const params = useParams();
  const parcelID = params?.id;

  useEffect(() => {
    async function fetchData() {
      const parcelData = await getParcelByID(parcelID);
      setparcelInfoDB(parcelData);
    }
    fetchData();
  }, [parcelID]);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    getValues,
    formState: { dirtyFields },
  } = useForm({});

  useEffect(() => {
    setValue("senderName", senderName);
    setValue("senderEmail", senderEmail);
    setValue("senderPhoneNumber", senderPhoneNumber);
    setValue("parcelType", parcelType);
    setValue("parcelWeight", parcelWeight);
    setValue("deliveryCharge", deliveryCharge);
    setValue("receiverName", receiverName);
    setValue("receiverPhoneNumber", receiverPhoneNumber);
    setValue("receiverEmail", receiverEmail);
    setValue("deliveryAddress", deliveryAddress);
    setValue("requestedDeliveryDate", requestedDeliveryDate?.split("T")[0]);
  }, [parcelInfoDB, setValue]);

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
  }, [weight, setValue]);

  if (!parcelInfoDB) return <p>Loading...</p>;

  const {
    senderName,
    senderEmail,
    senderPhoneNumber,
    parcelType,
    parcelWeight,
    deliveryCharge,
    receiverName,
    receiverPhoneNumber,
    receiverEmail,
    deliveryAddress,
    requestedDeliveryDate,
  } = parcelInfoDB;

  async function submitBookParcel(data) {
    // console.log("Modified fields:", dirtyFields);

    const dirtyData =
      Object.keys(dirtyFields).reduc <
      ((acc, key) => {
        acc[key] = getValues(key);
        return acc;
      },
      {});

    let updateParcel = { ...dirtyData };

    try {
      if (dirtyFields.deliveryAddress) {
        const { lat, lng } = await getLocation(data.deliveryAddress);
        updateParcel = {
          ...dirtyData,
          deliveryAddressLatitude: lat,
          deliveryAddressLongitude: lng,
        };
      }
      // console.log(updateParcel);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/my-parcel/update-parcel/${parcelID}`,
        updateParcel
      );
      console.log(response.data);
    } catch (error) {
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
