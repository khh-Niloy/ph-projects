import createAccessToken from "@/lib/token/createAccessToken";
import createRefreshToken from "@/lib/token/createRefreshToken";
import verifyToken from "@/lib/token/verifyToken";
import { Customer } from "@/models/customer.model";
import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const headerList = headers();
  const refreshToken = headerList.get("refreshTokenFromCookie");

  console.log(
    "refreshToken jwt/generateNewAccessAndRefreshToken: ",
    refreshToken
  );

  if (!refreshToken) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const userInfoFromRefreshToken = await verifyToken(refreshToken);

  console.log(
    "userInfoFromRefreshToken jwt/generateNewAccessAndRefreshToken: ",
    userInfoFromRefreshToken
  );

  if (!userInfoFromRefreshToken) {
    return new Response("jwt verify failed", { status: 401 });
  }

  const user = await Customer.findOne({
    email: userInfoFromRefreshToken.email,
  });

  console.log("user DB jwt/generateNewAccessAndRefreshToken: ", user);

  if (user.refreshToken === undefined || user.refreshToken !== refreshToken) {
    return NextResponse.json(
      { error: "refresh token does not matched or undefined" },
      { status: 401 }
    );
  }

  //   userInfoFromRefreshToken jwt/generateNewAccessAndRefreshToken:  {
  //   name: 'Hasib Hossain Niloy',
  //   email: 'admin_41@gmail.comq',
  //   role: 'customer',
  //   phoneNumber: '01915910291',
  //   image: 'https://res.cloudinary.com/dwrvergmd/image/upload/v1748814965/qxl1zsepaceiyl291b09.jpg',
  //   iat: 1748814903,
  //   exp: 1748815203
  // }

  const { iat, exp, ...cleanPlayLoad } = userInfoFromRefreshToken;

  // cookies().set("access-token", "");
  // cookies().set("refresh-token", "");

  const newAccessToken = await createAccessToken(cleanPlayLoad);
  const newRefreshToken = await createRefreshToken(cleanPlayLoad);

  console.log(
    "new aaccess refresh jwt/generateNewAccessAndRefreshToken: ",
    newAccessToken,
    newRefreshToken
  );

  //update refresh token in db
  const updateRefreshToken = await Customer.findByIdAndUpdate(
    user._id,
    {
      $set: {
        refreshToken: newRefreshToken,
      },
    },
    { new: true, runValidators: true }
  );
  console.log("updateRefreshToken", updateRefreshToken);

  // cookies().set("access-token", newAccessToken, {
  //   httpOnly: true,
  //   path: "/",
  // });

  // cookies().set("refresh-token", newRefreshToken, {
  //   httpOnly: true,
  //   path: "/",
  // });

  // console.log("added new access and refresh");

  return NextResponse.json({
    new_access_token: newAccessToken,
    new_refresh_token: newRefreshToken,
  });

  // cookies().set("access-token", newAccessToken);
  // cookies().set("refresh-token", newRefreshToken);
}
