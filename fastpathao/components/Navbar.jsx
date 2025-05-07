"use client";

import React, { useEffect, useState } from "react";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import userImage from "@/public/images/user.png";
import { signIn, signOut, useSession } from "next-auth/react";
// import navbarMenu from "@/lib/navbarMenu";

const Navbar = () => {
  const navigate = useRouter();
  //   const [roleBasedNav, setroleBasedNav] = useState([]);
  const session = useSession();
  console.log("session", session);

  //   useEffect(() => {
  //     let navItems = navbarMenu(session?.data?.user?.role);
  //     setroleBasedNav(navItems);
  //   }, [session?.data?.user?.role]);

  // const roleBasedNav = [];

  const authButton = session?.data?.user ? (
    <>
      <Button
        onClick={() => {
          signOut();
          navigate.push("/auth/login");
        }}
        variant="outline"
        size="sm"
        className="text-white bg-[#0167ff]  text-xs
            hover:shadow-2xl duration-300 transition-all cursor-pointer hover:bg-[#0167FF]/80"
      >
        Logout
      </Button>
      <Button
        onClick={() => {
          navigate.push("/dashboard");
        }}
        variant="outline"
        size="sm"
        className="text-white bg-[#0167ff] 
            hover:shadow-2xl duration-300 transition-all  text-xs cursor-pointer hover:bg-[#0167FF]/80"
      >
        Dashboard
      </Button>
    </>
  ) : (
    <>
      <Link href={"/auth/login"}>
        <Button
          onClick={() => signIn()}
          variant="outline"
          size="sm"
          className="text-white bg-[#0167ff] 
          hover:shadow-2xl duration-300 transition-all text-xs  cursor-pointer hover:bg-[#0167FF]/80"
        >
          Login
        </Button>
      </Link>
      <Link href={"/auth/register"}>
        <Button
          variant="outline"
          size="sm"
          className="text-white bg-[#0167ff] 
          hover:shadow-2xl duration-300 transition-all  text-xs cursor-pointer hover:bg-[#0167FF]/80"
        >
          Register
        </Button>
      </Link>
    </>
  );

  //   const profileItems = (
  //     <>
  //       <Button
  //         variant="outline"
  //         size="sm"
  //         className="text-[#E8252E] cursor-pointer bg-white hover:bg-white hover:scale-[1.03] duration-300"
  //       >
  //         Want to be seller?
  //       </Button>
  //     </>
  //   );

  return (
    <div className="flex items-center justify-between bg-[#F6F8FA] text-white px-8 py-3 fixed w-full z-50 border border-black/10">
      <div>FastPathao</div>
      {/* <div className="text-sm">
        <NavigationMenu>
          <NavigationMenuList>
            {roleBasedNav.map(({ label, link }) => (
              <NavigationMenuItem key={label}>
                <Link href={link} className="px-4 py-2">
                  {label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div> */}
      <div className="flex gap-3 items-center">
        {authButton}
        {session?.data?.user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="">
                <img
                  src={session?.data?.user?.image}
                  className="rounded-full object-cover w-11 h-11"
                ></img>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
