import getDBCollectionName from "@/lib/getDBCollectionName";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const foodCollection = await getDBCollectionName("food");
    const result = await foodCollection.find().toArray();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const foodCollection = await getDBCollectionName("food");
    const result = await foodCollection.insertOne(body);
    return NextResponse.json({ message: "Added to database", result });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
