import Link from "next/link";
import React from "react";

export default function Sidebar() {
  const navMenu = {
    admin: [
      { label: "all-delivery-man", link: "/dashboard/admin/all-delivery-man" },
      { label: "all-parcel", link: "/dashboard/admin/all-parcel" },
      { label: "all-user", link: "/dashboard/admin/all-user" },
      { label: "statistics", link: "/dashboard/admin/statistics" },
    ],
    customer: [
      { label: "book-a-parcel", link: "/dashboard/customer/book-a-parcel" },
      { label: "my-parcel", link: "/dashboard/customer/my-parcel" },
    ],
    deliveryman: [
      { label: "my-deliveries", link: "/dashboard/deliveryman/my-deliveries" },
      { label: "my-review", link: "/dashboard/deliveryman/my-review" },
    ],
  };

  const role = "customer";
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
