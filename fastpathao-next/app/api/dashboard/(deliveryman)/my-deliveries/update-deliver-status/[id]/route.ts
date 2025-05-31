import connectDB from "@/lib/db";
import { Deliverymen } from "@/models/deliverymen.model";
import { Parcel } from "@/models/parcel.model";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id);
  const { deliverystatus, assignedDeliveryManID } = await request.json();
  connectDB();

  await Parcel.findByIdAndUpdate(id, {
    $set: { deliverystatus: deliverystatus },
  });

  await Deliverymen.findByIdAndUpdate(assignedDeliveryManID, {
    $set: {
      isAvailable: true,
    },
    $inc: {
      number_of_parcel_delivered: 1,
    },
  });

  return NextResponse.json({ message: "updated delivery status" });
}
