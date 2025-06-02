export default async function generateNewAccessAndRefreshToken(
  refreshTokenFromCookie
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/jwt/generateNewAccessAndRefreshToken`,
    {
      method: "GET",
      headers: {
        refreshTokenFromCookie: `${refreshTokenFromCookie}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}
