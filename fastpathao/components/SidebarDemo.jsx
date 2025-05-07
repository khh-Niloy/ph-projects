"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";
import { User } from "lucide-react";
import { NotebookText } from "lucide-react";
import { House } from "lucide-react";
import { useSession } from "next-auth/react";
import { ChartColumnBig, Users, UsersRound } from "lucide-react";

export function SidebarDemo({ children }) {
  const session = useSession();

  const userLinks = [
    {
      label: "Home",
      href: "/",
      icon: <House size={19} />,
    },
    {
      label: "Book A Parcel",
      href: "/dashboard/user/book-a-parcel",
      icon: <NotebookText size={19} />,
    },
    {
      label: "My Parcel",
      href: "/dashboard/user/my-parcel",
      icon: <Package size={19} />,
    },
    {
      label: "My Profile",
      href: "#",
      icon: <User size={19} />,
    },
  ];

  const adminLinks = [
    {
      label: "Home",
      href: "/",
      icon: <House size={19} />,
    },
    {
      label: "All Delivery Men",
      href: "/dashboard/admin/all-delivery-men",
      icon: <Users size={19} />,
    },
    {
      label: "All Parcel",
      href: "/dashboard/admin/all-parcel",
      icon: <Package size={19} />,
    },
    {
      label: "All User",
      href: "/dashboard/admin/all-user",
      icon: <UsersRound size={19} />,
    },
    {
      label: "My Profile",
      href: "#",
      icon: <User size={19} />,
    },
  ];

  console.log(session);

  const finalRenderLink =
    session?.data?.user?.role == "user" ? userLinks : adminLinks;

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "h-screen",
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md bg-gray-100 md:flex-row dark:bg-[#F6F8FA]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} className="bg-[#F6F8FA]">
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto bg-[#F6F8FA]">
            <div className="mt-8 flex flex-col gap-2">
              {finalRenderLink.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-[#ffffff]">
          {children}
        </div>
      </div>
    </div>
  );
}
