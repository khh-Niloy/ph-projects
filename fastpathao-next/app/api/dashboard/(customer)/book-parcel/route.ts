import { Parcel } from "@/models/parcel.model";
import connectDB from "@/lib/db";

export async function POST(request) {
  const body = await request.json();
  await connectDB();
  const parcel = await Parcel.create(body);
  return Response.json({ message: "added" });
}
