import React from "react";

export default async function verifyToken(token) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/jwt/verify-token`,
      {
        method: "GET",
        headers: {
          token: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.userInfo;
  } catch (error) {
    console.error("JWT verify error:", error);
    return null;
  }
}
