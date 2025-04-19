import { getCollectionDB } from "@/lib/db/getCollectionDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  const userCollection = await getCollectionDB("user");
  const user = await userCollection.findOne({ email: email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const checkPass = await bcrypt.compare(password, user.password);

  if (!checkPass) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ passwordCheck: true });
}
