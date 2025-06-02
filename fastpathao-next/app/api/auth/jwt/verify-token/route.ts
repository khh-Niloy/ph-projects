import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";

export async function GET(request: Request) {
  try {
    const headerList = headers();
    const token = headerList.get("token");

    console.log("token from verify token route", token);

    if (!token) {
      throw new Response("Unauthorized", { status: 401 });
    }
    const userInfoFromtoken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("userInfoFromtoken from verify token route", userInfoFromtoken);
    if (!userInfoFromtoken) {
      return new Response("jwt verify failed", { status: 401 });
    }
    return Response.json({ userInfo: userInfoFromtoken });
  } catch (error) {
    console.error("JWT error:", error);
    return new Response("Unauthorized: Invalid or expired token", {
      status: 401,
    });
  }
}
