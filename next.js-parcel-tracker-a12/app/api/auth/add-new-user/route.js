import User from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const reqBody = await request.json();
    console.log("reqBody", reqBody);

    const isUserExist = await User.findOne({ email: reqBody.email });
    if (isUserExist)
      return NextResponse.json({
        message: "User already exist",
      });

    const newUser = await User.create(reqBody);
    console.log("newUser", newUser);

    return NextResponse.json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error: ${error.message}`,
    });
  }
}
