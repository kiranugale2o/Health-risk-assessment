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

      {/* <footer className=" w-full bg-[#2c3e50] text-white p-2 text-center">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <p>&copy; 2024 Healthcare Inc. All Rights Reserved.</p>
          </div>
        </div>
      </footer> */}
    </>
  );
}
