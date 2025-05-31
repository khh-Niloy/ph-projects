import { Parcel } from "@/models/parcel.model";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  await connectDB();
  try {
    const parcel = await Parcel.create(body);
    revalidatePath("/dashboard/all-parcel");

    return NextResponse.json({ message: "added to db" }, { status: 201 });
  } catch (error) {
    console.log(error);
    const err =
      error instanceof Error ? error.message : "Something went wrong (post)";
    return NextResponse.json(
      { message: "Error creating parcel", error: err },
      { status: 400 }
    );
  }
}
