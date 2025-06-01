import React from "react";

export default async function verifyToken(accessToken) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/jwt/verify-token`,
    {
      method: "GET",
      headers: {
        cookie: `${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data.userInfo;
}
