import { getCollectionDB } from "@/lib/db/getCollectionDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { email } = body;
  try {
    const userCollection = await getCollectionDB("user");
    const result = await userCollection.findOne({ email: email });
    return NextResponse.json({ role: result.role });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
