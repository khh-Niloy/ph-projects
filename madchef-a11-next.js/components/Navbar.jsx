"use client";

import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import userImage from "@/public/images/user.png";
import { signIn, signOut, useSession } from "next-auth/react";
import navbarMenu from "@/lib/navbarMenu";

const Navbar = () => {
  const navigate = useRouter();
  const [roleBasedNav, setroleBasedNav] = useState([]);
  const session = useSession();

  useEffect(() => {
    let navItems = navbarMenu(session?.data?.user?.role);
    setroleBasedNav(navItems);
  }, [session?.data?.user?.role]);

  const authButton = session?.data?.user ? (
    <Button
      onClick={() => {
        signOut();
        navigate.push("/login");
      }}
      variant="outline"
      size="sm"
      className="text-[#E8252E] cursor-pointer bg-white hover:bg-white hover:scale-[1.03] duration-300"
    >
      Logout
    </Button>
  ) : (
    <>
      <Link href={"/login"}>
        <Button
          onClick={() => signIn()}
          variant="outline"
          size="sm"
          className="text-[#E8252E] cursor-pointer bg-white hover:bg-white hover:scale-[1.03] duration-300"
        >
          Login
        </Button>
      </Link>
      <Link href={"/register"}>
        <Button
          onClick={() => navigate.push("/register")}
          variant="outline"
          size="sm"
          className="text-[#E8252E] cursor-pointer bg-white hover:bg-white hover:scale-[1.03] duration-300"
        >
          Register
        </Button>
      </Link>
    </>
  );

  const profileItems = (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-[#E8252E] cursor-pointer bg-white hover:bg-white hover:scale-[1.03] duration-300"
      >
        Want to be seller?
      </Button>
    </>
  );

  return (
    <div className="flex items-center justify-between bg-[#E8252E] text-white px-8 py-2 fixed w-full z-50">
      <div>Logo:Madchef</div>
      <div className="text-sm">
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
      </div>
      <div className="flex gap-3 items-center">
        {authButton}
        {session?.data?.user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={session?.data?.user?.photoURL}></img>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {profileItems}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
