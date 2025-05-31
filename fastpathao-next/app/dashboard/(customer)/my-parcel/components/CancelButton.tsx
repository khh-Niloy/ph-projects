"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";

type Props = {
  deliverystatus: string;
  _id: string;
};

export default function CancelButton({ deliverystatus, _id }: Props) {
  async function handleCancel(_id: string) {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/my-parcel/cancel-parcel/${_id}`,
      { deliverystatus: "cancelled" }
    );
    console.log(response.data);
  }

  return (
    <Button
      onClick={() => handleCancel(_id)}
      disabled={deliverystatus !== "pending"}
    >
      {deliverystatus === "cancelled" ? "Cancelled" : "Cancel"}
    </Button>
  );
}
