import { getCollectionDB } from "@/lib/db/getCollectionDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const userCollection = await getCollectionDB("user");
  const result = await userCollection.insertOne(body);
  return NextResponse.json(result);
}
