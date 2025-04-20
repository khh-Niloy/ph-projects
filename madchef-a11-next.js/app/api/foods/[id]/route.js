import { getCollectionDB } from "@/lib/db/getCollectionDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const foodCollection = await getCollectionDB("food");
    const result = await foodCollection.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
