import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";

export async function GET(request: Request) {
  const headerList = headers();
  const accessToken = headerList.get("cookie");

  if (!accessToken) {
    throw new Response("Unauthorized", { status: 401 });
  }
  const userInfoFromAccessToken = jwt.verify(
    accessToken,
    process.env.JWT_SECRET
  );
  if (!userInfoFromAccessToken) {
    return new Response("jwt verify failed", { status: 401 });
  }
  return Response.json({ userInfo: userInfoFromAccessToken });
}
