import connectDB from "@/lib/db";
import { Deliverymen } from "@/models/deliverymen.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connectDB();
  const allParcel = await Deliverymen.find({ isAvailable: true }).select(
    "_id name"
  );
  return NextResponse.json(allParcel);
}
