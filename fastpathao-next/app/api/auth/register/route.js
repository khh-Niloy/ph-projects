import { Customer } from "@/models/customer.model";
import createAccessToken from "@/lib/token/createAccessToken";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function POST(request) {
  const body = await request.json();

  connectDB();

  const user = await Customer.findOne({ email: body.email });

  if (user) {
    throw Error("user alreay exist");
  }

  const result = await Customer.insertOne(body);

  const userPlayload = {
    name: body.name,
    email: body.email,
    role: body.role,
    phoneNumber: body.phoneNumber,
    image: body.image,
  };

  const accessToken = await createAccessToken(userPlayload);

  console.log(accessToken);

  return NextResponse.json(
    { message: "user added to db", accessToken: accessToken },
    { status: 201 }
  );
}
