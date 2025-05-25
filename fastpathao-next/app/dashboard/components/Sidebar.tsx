import Link from "next/link";
import React from "react";

export default function Sidebar() {
  const navMenu = {
    admin: [
      { label: "all-delivery-man", link: "/dashboard/all-delivery-man" },
      { label: "all-parcel", link: "/dashboard/all-parcel" },
      { label: "all-user", link: "/dashboard/all-user" },
      { label: "statistics", link: "/dashboard/statistics" },
    ],
    customer: [
      { label: "book-a-parcel", link: "/dashboard/book-a-parcel" },
      { label: "my-parcel", link: "/dashboard/my-parcel" },
    ],
    deliveryman: [
      { label: "my-deliveries", link: "/dashboard/my-deliveries" },
      { label: "my-review", link: "/dashboard/my-review" },
    ],
  };

  const role = "admin";
  const navItems = navMenu[role] || [];

  return (
    <div className="text-white">
      <h1>Sidebar</h1>

      <ul>
        {navItems.map(({ label, link }) => (
          <Link key={label} href={link}>
            <li>{label}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
