"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogoImg } from "../images";

export default function Navbar({ user, UserProfile }) {
  const router = useRouter();
  const style = {
    backgroundImage: "url('be1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "auto", // Full height of the viewport
    margin: 0, // Remove default margin
  };
  const pathname = usePathname();
  const navItem = [
    {
      name: "Home",
      path: "/",
      show: UserProfile,
    },
    {
      name: "Risk Assessment",
      path: "/assessment",
      show: UserProfile,
    },
    {
      name: "Profile",
      path: "/dashboard",
      show: UserProfile,
    },
  ];

  return (
    <>
      <header classNameName="flex absolute top-0 left-0 w-full h-[70px] z-10 justify-between  bg-[#285B5A]  px-3 lg:px-10 py-2">
        <div classNameName="flex items-center text-[#141414]  border-none px-0 lg:p-auto justify-between max-w-screen-xl mx-auto">
          <LogoImg />
          <Sheet>
            <SheetTrigger
              classNameName={`flex mt-0 ml-10 lg:hidden ${
                user ? "block" : "hidden"
              }`}
            >
              <AlignLeft classNameName="font-2xl text-[#80ED99] size-9 w-[70px] mx-10" />
            </SheetTrigger>
            <button
              classNameName={`${
                user ? "hidden" : "flex"
              } lg:hidden flex min-w-[94px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden border rounded-full h-10 lg:px-4 bg-transperent text-white font-exo-2 font-normal font-bold text-[15px] leading-[24px] hover:bg-white hover:text-black mx-20`}
            >
              <Link href={pathname === "/sign-up" ? "/sign-in" : "/sign-up"}>
                <span>{pathname === "/sign-up" ? "Log In" : "Sign up"}</span>
              </Link>
            </button>
            <SheetContent classNameName="py-24">
              <SheetTitle
                classNameName="uppercase text-2xl semibold text-[#80ED99]"
                onClick={() => {
                  router.push("/");
                }}
              >
                HealthCare
              </SheetTitle>

              <div classNameName="flex flex-col lg:hidden justify-start mt-6 gap-5">
                {navItem.map((d) => {
                  return (
                    <div key={d.name}>
                      {d.show ? (
                        <SheetClose asChild>
                          <Link
                            href={d.path}
                            classNameName="font-semibold uppercase flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#80ED99] hover:bg-sky-300 bg-[#80ED99] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em] "
                          >
                            {d.name}
                          </Link>
                        </SheetClose>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div classNameName="hidden lg:flex flex-1 justify-end gap-8">
          <div classNameName="flex items-center gap-9">
            {navItem.map((d) => {
              return (
                <div key={d.name}>
                  {d.show ? (
                    <>
                      <a
                        classNameName="text-[#141414] text-sm min-w-[84px] max-w-[480px] p-3 font-semibold font-serif leading-normal rounded-xl h-10 px-4  hover:bg-green-400  text-white text-lg  font-bold leading-normal tracking-[0.015em]"
                        href={d.path}
                      >
                        {d.name}
                      </a>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div classNameName="flex gap-5 p-2">
            {!user ? (
              <>
                <Link href="/sign-up">
                  <button classNameName="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden border rounded-full h-10 px-4 bg-transperent text-white font-exo-2 font-normal font-bold text-[15px] leading-[24px]  hover:bg-white hover:text-black ">
                    <span classNameName="truncate ">Sign up</span>
                  </button>
                </Link>
                <Link href="/sign-in">
                  <button classNameName="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden border rounded-full h-10 px-4 bg-transperent text-white font-exo-2 font-normal font-bold text-[15px] leading-[24px] hover:bg-white hover:text-black ">
                    <span classNameName="truncate">Log in</span>
                  </button>
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
