"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { label: "Home", link: "/" },
  { label: "All Foods", link: "/all-food" },
  { label: "Gallery", link: "/gallery" },
  { label: "Add Food", link: "/add-food" },
  { label: "My Orders", link: "/my-orders" },
];

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-[#E8252E] text-white px-8 py-2 fixed w-full">
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
        <Link href={"/login"}>
          <Button
            variant="outline"
            size="sm"
            className="text-[#E8252E] cursor-pointer"
          >
            Login
          </Button>
        </Link>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
