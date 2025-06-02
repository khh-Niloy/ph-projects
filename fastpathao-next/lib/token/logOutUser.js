import { NextResponse } from "next/server";

export default function logOutUser() {
  const response = NextResponse.redirect(
    new URL("/auth/login", process.env.NEXT_PUBLIC_API_BASE_URL)
  );
  response.cookies.set("access-token", "");
  response.cookies.set("refresh-token", "");

  return response;
}
