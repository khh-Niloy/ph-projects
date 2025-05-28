"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";

export default function CancelButton({ deliverystatus, _id }) {
  async function handleCancel(_id) {
    const response = await axios.patch(
      `http://localhost:3000/api/dashboard/my-parcel/cancel-parcel/${_id}`,
      { deliverystatus: "cancelled" }
    );
    console.log(response.data);
  }

  return (
    <Button
      onClick={() => handleCancel(_id)}
      disabled={deliverystatus !== "pending"}
      variant="outline"
    >
      {deliverystatus === "cancelled" ? "Cancelled" : "Cancel"}
    </Button>
  );
}
