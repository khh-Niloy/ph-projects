import connectDB from "@/lib/db";
import { Parcel } from "@/models/parcel.model";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const body = await request.json();
  console.log(body);

  await connectDB();

  const updateDeliveryStatus = await Parcel.findByIdAndUpdate(
    id,
    {
      $set: body,
    }
    // { new: true, runValidators: true }
  );

  return NextResponse.json({ message: "updated delivery Status!" });
}
