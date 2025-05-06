import getDBCollection from "@/lib/getDBCollection";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const body = await req.json();
  const userCollection = await getDBCollection("user");
  const isExist = await userCollection.findOne({ email: body.userEmail });

  try {
    if (isExist) {
      return NextResponse.json(
        { message: "You already have an account", success: false },
        { status: 409 }
      );
    }
    let hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    const result = await userCollection.insertOne(body);
    return NextResponse.json(
      { success: true, message: "login successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
