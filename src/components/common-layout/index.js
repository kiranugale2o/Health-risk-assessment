"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "../Navbar";

export default function CommonLayout({ children }) {
  return (
    <>
      {/* headers section */}
      <Navbar />
      <main>{children}</main>
    </>
  );
}
