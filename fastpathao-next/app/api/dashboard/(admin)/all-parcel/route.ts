import connectDB from "@/lib/db";
import { Parcel } from "@/models/parcel.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connectDB();
  const allParcel = await Parcel.find();
  return NextResponse.json(allParcel);
}
