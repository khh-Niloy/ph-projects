import { Customer } from "@/models/customer.model";
import createAccessToken from "@/lib/token/createAccessToken";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { cookies } from "next/headers";
import createRefreshToken from "@/lib/token/createRefreshToken";

export async function POST(request) {
  const body = await request.json();

  connectDB();

  const user = await Customer.findOne({ email: body.email });

  if (user) {
    throw Error("user alreay exist");
  }

  const userPlayload = {
    name: body.name,
    email: body.email,
    role: body.role,
    phoneNumber: body.phoneNumber,
    image: body.image,
  };

  const refreshToken = await createRefreshToken(userPlayload);

  const result = await Customer.insertOne({
    ...body,
    refreshToken: refreshToken,
  });

  const accessToken = await createAccessToken(userPlayload);

  cookies().set("access-token", accessToken);
  cookies().set("refresh-token", refreshToken);

  console.log(accessToken, refreshToken);

  return NextResponse.json({ message: "user added to db" }, { status: 201 });
}
