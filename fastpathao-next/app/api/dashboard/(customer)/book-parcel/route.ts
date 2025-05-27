import { Parcel } from "@/models/parcel.model";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  const body = await request.json();
  await connectDB();
  try {
    const parcel = await Parcel.create(body);
    revalidatePath("/dashboard/all-parcel");

    return NextResponse.json(
      { message: "added to db", result: parcel },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating parcel", error: error.message },
      { status: 400 }
    );
  }
}
