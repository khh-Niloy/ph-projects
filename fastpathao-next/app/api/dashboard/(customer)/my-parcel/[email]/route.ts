import connectDB from "@/lib/db";
import { Parcel } from "@/models/parcel.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { email } = params;
  await connectDB();
  const parcel = await Parcel.find({ senderEmail: email }).select(
    "-senderName -senderEmail -senderPhoneNumber -receiverEmail -deliveryAddressLatitude -deliveryAddressLongitude"
  );
  return NextResponse.json(parcel);
}
