import jwt from "jsonwebtoken";

export default async function createAccessToken(userPlayload) {
  const accessToken = jwt.sign(userPlayload, process.env.JWT_SECRET, {
    expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}`,
  });
  return accessToken;
}
