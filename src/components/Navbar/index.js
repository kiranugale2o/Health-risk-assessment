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

export default function Navbar({ user, UserProfile }) {
  const router = useRouter();
  console.log(user, UserProfile, "fffff");

  const pathname = usePathname();
  const navItem = [
    {
      name: "Home",
      path: "/",
      show: UserProfile,
    },
    {
      name: "Saved Assessment",
      path: "/savedAssement",
      show: UserProfile,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      show: UserProfile,
    },
  ];

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#F0F2F5] px-3 lg:px-10 py-3">
        <div className="flex items-center text-[#141414]  px-0 lg:p-auto justify-between">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/musico-9bf36.appspot.com/o/smallEx%2Fbg2.jpg?alt=media&token=e421a24f-4983-4646-8450-39dab7d2f471"
            width={150}
            height={70}
            alt="logo"
          />
          <Sheet>
            <SheetTrigger
              className={`flex mt-0  ml-10  lg:hidden ${
                user ? "block" : "hidden"
              }`}
            >
              <AlignLeft className="font-2xl text-[#80ED99] text-black size-9 w-[70px] mx-10    " />
            </SheetTrigger>
            <button
              className={`${
                user ? "hidden" : "flex"
              } lg:hidden flex min-w-[94px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 lg:px-4 bg-[#80ED99]  text-white text-sm font-bold leading-normal tracking-[0.015em] mx-20`}
            >
              <Link href={pathname === "/sign-up" ? "/sign-in" : "/sign-up"}>
                <span className="">
                  {pathname === "/sign-up" ? "Log In" : "Sign up"}
                </span>
              </Link>
            </button>

            <SheetContent className="py-24">
              <SheetTitle
                className="uppercase text-2xl semibold text-[#80ED99] "
                onClick={() => {
                  router.push("/");
                }}
              >
                HealthCare
              </SheetTitle>

              <div className=" flex flex-col lg:hidden justify-start  mt-6 gap-5   ">
                {navItem.map((d) => {
                  return (
                    <div key={d.name}>
                      {d.show ? (
                        <SheetClose asChild>
                          <Link
                            href={d.path}
                            className="font-semibold uppercase flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#80ED99] hover:bg-sky-300 bg-[#80ED99]text-[#111418] text-sm font-bold leading-normal tracking-[0.015em] "
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
        <div className="hidden lg:flex flex-1 justify-end gap-8 ">
          <div className="flex items-center gap-9">
            {navItem.map((d) => {
              return (
                <div key={d.name}>
                  {d.show ? (
                    <a
                      className="text-[#141414] text-sm font-medium leading-normal"
                      href={d.path}
                    >
                      {d.name}
                    </a>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            {!user ? (
              <>
                <Link href="/sign-up">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded h-10 px-4 bg-[#80ED99] text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Sign up</span>
                  </button>
                </Link>
                <Link href="/sign-in">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded h-10 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Log in</span>
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/assement">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded h-10 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">
                      Start your risk Assessment{" "}
                    </span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
