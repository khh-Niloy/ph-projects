import connectDB from "@/lib/db";
import { Parcel } from "@/models/parcel.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectDB();
  const parcel = await Parcel.findById(id);
  return NextResponse.json(parcel);
}

export async function PATCH(request, { params }) {
  const { id } = params;

  const body = await request.json();
  console.log(body);

  //   {
  //   parcelType: 'Liquid',
  //   senderPhoneNumber: '01915910287',
  //   requestedDeliveryDate: '2025-05-29'
  // }

  await connectDB();

  const updateParcelInfo = await Parcel.findByIdAndUpdate(
    id,
    {
      $set: body,
    }
    // { new: true, runValidators: true }
  );

  return NextResponse.json({ message: "updated info!" });
}
