import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-[black]">
      <nav>
        <Button>Go to dashboard</Button>
        <Link href={`/auth/register`}>
          <Button>Register</Button>
        </Link>
        <Link href={`/auth/login`}>
          <Button>Login</Button>
        </Link>
      </nav>
    </div>
  );
}
