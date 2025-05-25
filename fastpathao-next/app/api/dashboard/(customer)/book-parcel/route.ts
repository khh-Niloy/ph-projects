import { Parcel } from "@/models/parcel.model";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  await connectDB();
  const parcel = await Parcel.create(body);
  return NextResponse.json(
    { message: "added to db", result: parcel },
    { status: 201 }
  );
}
