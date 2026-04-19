"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogoImg } from "../images";

export default function Navbar({ user, UserProfile }) {
  const router = useRouter();
  const pathname = usePathname();

  const navItem = [
    { name: "Home", path: "/", show: UserProfile },
    { name: "Risk Assessment", path: "/assessment", show: UserProfile },
    { name: "Profile", path: "/dashboard", show: UserProfile },
  ];

  return (
    <header className="flex sticky top-0 left-0 w-full h-[68px] z-50 justify-between items-center bg-gray border-b border-[#D0E8E0] px-6 lg:px-10">
      {/* Logo — your original component */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <LogoImg />
      </div>

      {/* Desktop Nav Links */}
      <nav className="hidden lg:flex items-center gap-1">
        {navItem.map((d) =>
          d.show ? (
            <Link
              key={d.name}
              href={d.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === d.path
                  ? "bg-[#E1F5EE] text-[#085041]"
                  : "text-[#6B8C83] hover:bg-[#E1F5EE] hover:text-[#085041]"
              }`}
            >
              {d.name}
            </Link>
          ) : null,
        )}
      </nav>

      {/* Desktop Auth Buttons */}
      <div className="hidden lg:flex items-center gap-3">
        {!user ? (
          <>
            <Link href="/sign-in">
              <button className="px-5 py-2 text-sm font-medium text-[#1A2E2A] border border-[#D0E8E0] rounded-lg hover:border-[#0D9E75] hover:text-[#0D9E75] transition-all duration-150">
                Log in
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="px-5 py-2 text-sm font-medium text-white bg-[#0D9E75] rounded-lg hover:bg-[#085041] transition-all duration-150">
                Get started
              </button>
            </Link>
          </>
        ) : null}
      </div>

      {/* Mobile Sheet */}
      <Sheet>
        <SheetTrigger className={`flex lg:hidden ${user ? "block" : "hidden"}`}>
          <AlignLeft className="size-7 text-[#0D9E75]" />
        </SheetTrigger>

        {!user && (
          <Link
            href={pathname === "/sign-up" ? "/sign-in" : "/sign-up"}
            className="flex lg:hidden px-4 py-2 text-sm font-medium text-white bg-[#0D9E75] rounded-lg"
          >
            {pathname === "/sign-up" ? "Log in" : "Sign up"}
          </Link>
        )}

        <SheetContent className="py-20 bg-white">
          <SheetTitle className="mb-8">
            <LogoImg />
          </SheetTitle>
          <div className="flex flex-col gap-3">
            {navItem.map((d) =>
              d.show ? (
                <SheetClose asChild key={d.name}>
                  <Link
                    href={d.path}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all ${
                      pathname === d.path
                        ? "bg-[#E1F5EE] text-[#085041]"
                        : "bg-[#F7FAF9] text-[#6B8C83] hover:bg-[#E1F5EE] hover:text-[#085041]"
                    }`}
                  >
                    {d.name}
                  </Link>
                </SheetClose>
              ) : null,
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
