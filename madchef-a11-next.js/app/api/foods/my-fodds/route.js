import { getCollectionDB } from "@/lib/db/getCollectionDB";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { userEmail } = req.query;
    const foodCollection = await getCollectionDB("food");
    const result = await foodCollection.findOne({ email: userEmail });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}