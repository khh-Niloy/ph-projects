"use client";

import React, { useContext } from "react";
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

const navLinks = [
  { label: "Home", link: "/" },
  { label: "All Foods", link: "/foods" },
  { label: "Gallery", link: "/gallery" },
  { label: "Add Food", link: "/foods/add" },
  { label: "My Orders", link: "/my-orders" },
];

const Navbar = () => {
  const { signOutUser, user } = useContext(AuthContext);
  const navigate = useRouter();
  console.log(user)

  async function handleSignOut() {
    await signOutUser();
    navigate.push("/login");
  }

  const authButton = user ? (
    <Button
      variant="outline"
      size="sm"
      className="text-[#E8252E] cursor-pointer bg-white"
      onClick={handleSignOut}
    >
      Logout
    </Button>
  ) : (
    <Link href={"/login"}>
      <Button
        variant="outline"
        size="sm"
        className="text-[#E8252E] cursor-pointer bg-white"
      >
        Login
      </Button>
    </Link>
  );

  return (
    <div className="flex items-center justify-between bg-[#E8252E] text-white px-8 py-2 fixed w-full z-50">
      <div>Logo:Madchef</div>
      <div className="text-sm">
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map(({ label, link }) => (
              <NavigationMenuItem key={label}>
                <Link href={link} className="px-4 py-2">
                  {label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex gap-3">
        {authButton}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
