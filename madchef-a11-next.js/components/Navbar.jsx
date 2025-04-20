"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContext } from "@/context/AuthContextProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getRole } from "@/lib/getRole";
import Image from "next/image";

const Navbar = () => {
  const { signOutUser, user } = useContext(AuthContext);
  const navigate = useRouter();
  const [role, setRole] = useState(null);

  const navLinks = [
    { label: "Home", link: "/" },
    { label: "All Foods", link: "/foods" },
    { label: "Gallery", link: "/gallery" },
    { label: "Add Food", link: "/foods/add" },
    { label: "My Orders", link: "/my-orders" },
    { label: "My Food", link: "/foods/my-foods" },
  ];

  const roleBasedNav = navLinks.filter(({ label }) => {
    if (role == "user" && (label == "Gallery" || label == "My Orders")) {
      return false;
    }
    return true;
  });

  async function handleSignOut() {
    await signOutUser();
    navigate.push("/login");
  }

  useEffect(() => {
    async function fetchData() {
      const res = await getRole(user?.email);
      setRole(res.data.role);
    }
    fetchData();
  }, [user?.email]);

  const authButton = user ? (
    <Button
      variant="outline"
      size="sm"
      className="text-[#E8252E] cursor-pointer bg-white hover:bg-white hover:scale-[1.03] duration-300"
      onClick={handleSignOut}
    >
      Logout
    </Button>
  ) : (
    <Link href={"/login"}>
      <Button
        variant="outline"
        size="sm"
        className="text-[#E8252E] cursor-pointer bg-white hover:bg-white hover:scale-[1.03] duration-300"
      >
        Login
      </Button>
    </Link>
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
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img src={user?.photoURL} alt={user?.displayName}></img>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {profileItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
