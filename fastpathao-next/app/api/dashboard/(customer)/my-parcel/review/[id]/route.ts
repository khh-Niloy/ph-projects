import connectDB from "@/lib/db";
import { Parcel } from "@/models/parcel.model";
import { Review } from "@/models/review.model";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  await connectDB();
  const parcel = await Parcel.findById(id);

  const reviewDoc = {
    reviewerName: parcel.receiverName,
    reviewerPhoneNumber: parcel.receiverPhoneNumber,
    rating: parseFloat(body.rating),
    feedback: body.feedback,
    assignedDeliveryManID: parcel.assignedDeliveryManID,
    review_giving_date: new Date(),
  };

  await Review.insertOne(reviewDoc);

  return NextResponse.json({ message: "review added" });
}
