import connectDB from "@/lib/db";
import { Deliverymen } from "@/models/deliverymen.model";
import { Parcel } from "@/models/parcel.model";
import { Review } from "@/models/review.model";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { email } = params;
  connectDB();
  const deliverymen = await Deliverymen.findOne({ email: email });
  const id = deliverymen._id.toString();
  const reviews = await Review.find({ assignedDeliveryManID: id });
  return NextResponse.json(reviews);
}
