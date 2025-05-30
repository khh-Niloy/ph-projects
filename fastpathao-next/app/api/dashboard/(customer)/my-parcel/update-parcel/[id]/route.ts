import connectDB from "@/lib/db";
import { Parcel } from "@/models/parcel.model";
import { NextResponse } from "next/server";

type ParamsType = {
  id: string;
};

export async function GET(
  request: Request,
  { params }: { params: ParamsType }
) {
  const { id } = params;
  await connectDB();
  const parcel = await Parcel.findById(id);
  return NextResponse.json(parcel);
}

export async function PATCH(
  request: Request,
  { params }: { params: ParamsType }
) {
  const { id } = params;

  const body = await request.json();
  //   console.log(body);
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
