import connectDB from "@/lib/db";
import { Deliverymen } from "@/models/deliverymen.model";
import { Parcel } from "@/models/parcel.model";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  const { email } = params;
  connectDB();

  const user = await Deliverymen.findOne({ email: email });
  const allReceivedParcelList = await Parcel.find({
    assignedDeliveryManID: user._id,
  });
  //   console.log(allReceivedParcelList);
  return NextResponse.json(allReceivedParcelList);
}
