import verifyToken from "@/lib/token/verifyToken";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL("/home", request.url));

  const accessToken = cookies().get("access-token")?.value;

  const userInfo = await verifyToken(accessToken);

  // console.log(data.userInfo);
  console.log(userInfo.role);

  const { pathname } = request.nextUrl;
  console.log(pathname);
  // '/dashboard/customer/book-a-parcel',

  if (pathname.startsWith(`/dashboard/${userInfo.role}`))
    return NextResponse.next();

  return NextResponse.redirect(new URL("/auth/login", request.url));
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
