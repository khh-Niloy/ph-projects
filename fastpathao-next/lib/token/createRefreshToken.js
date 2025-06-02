import jwt from "jsonwebtoken";

export default async function createRefreshToken(userPlayload) {
  const refreshToken = jwt.sign(userPlayload, process.env.JWT_SECRET, {
    expiresIn: `${process.env.REFRESH_TOKEN_EXPIRY}`,
  });
  return refreshToken;
}
