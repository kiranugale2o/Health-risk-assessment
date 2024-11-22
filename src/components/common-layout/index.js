"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "../Navbar";

export default function CommonLayout({ user, UserProfile, children }) {
  return (
    <>
      {/* headers section */}
      <Navbar user={user} UserProfile={UserProfile} />
      <main>{children}</main>
    </>
  );
}
