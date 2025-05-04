import getDBCollectionName from "@/lib/getDBCollectionName";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const userCollection = await getDBCollectionName("user");
  const isExist = await userCollection.findOne({ email: body.email });

  try {
    if (isExist) {
      return NextResponse.json(
        { message: "You already have an account", success: false },
        { status: 409 }
      );
    }
    const result = await userCollection.insertOne(body);
    return NextResponse.json(
      { success: true, message: "login successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
