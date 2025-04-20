import { getCollectionDB } from "@/lib/db/getCollectionDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const foodCollection = await getCollectionDB("food");
    const result = await foodCollection.insertOne(body);
    return NextResponse.json({ message: "Added to database", result });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
