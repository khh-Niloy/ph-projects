import { getCollectionDB } from "@/lib/db/getCollectionDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const foodCollection = await getCollectionDB("food");
    const result = await foodCollection.find().toArray();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
