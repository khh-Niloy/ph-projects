import verifyToken from "@/lib/token/verifyToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import logOutUser from "@/lib/token/logOutUser";

export async function middleware(request: NextRequest) {
  const accessToken = cookies().get("access-token")?.value;

  /* const userInfo2 = await verifyToken(accessToken);
  
  console.log("accesstoken middleware: ", accessToken);
  
  if (!userInfo2) {
    const refreshToken = cookies().get("refresh-token")?.value;
    console.log("refreshToken middleware: ", refreshToken);

    if (!refreshToken) {
      // if no refresh token user will go to login page
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const access_refresh_token = await generateNewAccessAndRefreshToken(
      refreshToken
    );
    
    console.log(
      "access_refresh_token generateNewAccessAndRefreshToken middleare",
      access_refresh_token
    );

    if (!access_refresh_token?.new_access_token || !access_refresh_token?.new_refresh_token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const response = NextResponse.next()

    response.cookies.set("access-token", access_refresh_token.new_access_token)
    response.cookies.set("refresh-token", access_refresh_token.new_refresh_token)

    const userInfo = await verifyToken(access_refresh_token.new_access_token);

    if (!userInfo) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // cookies().set("access-token", `${access_refresh_token.newAccessToken}`);
    // cookies().set("refresh-token", `${access_refresh_token.newRefreshToken}`);
  } */

  const userInfo = await verifyToken(accessToken);

  const { pathname } = request.nextUrl;
  // console.log(pathname);
  // '/dashboard/customer/book-a-parcel',

  if (pathname.startsWith(`/dashboard/${userInfo.role}`))
    return NextResponse.next();

  // const response = NextResponse.redirect(new URL("/auth/login", request.url));

  return logOutUser();
}

export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/customer/:path*",
    "/dashboard/deliveryman/:path*",
  ],
};

//   {
//   name: 'Hasib Hossain Niloy',
//   email: 'admin_1@gmail.com',
//   role: 'customer',
//   phoneNumber: '01915910291',
//   image: 'https://res.cloudinary.com/dwrvergmd/image/upload/v1748792197/flvlfmgfg5pgagbvmlyu.jpg',
//   iat: 1748792135,
//   exp: 1748793335
// }
