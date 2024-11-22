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

export default function Navbar() {
  const router = useRouter();

  const pathname = usePathname();
  const navItem = [
    {
      name: "Home",
      path: "/",
      show: true,
    },
    {
      name: "Get Assessment",
      path: "/assessment",
      show: true,
    },
    {
      name: "Saved Assessment",
      path: "/savedAssement",
      show: true,
    },
    {
      name: "Dashboard",
      path: "/profile",
      show: true,
    },
  ];

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#F0F2F5] px-3 lg:px-10 py-3">
        <div className="flex items-center gap-2 text-[#141414] py-3 px-0 lg:p-auto">
          <div className="size-6">
            <svg
              className=""
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className=" lg:p-auto text-[#141414] text-[25px]  font-bold leading-tight tracking-[-0.015em]">
            Health Check
          </h2>
          <Sheet>
            <SheetTrigger
              className={`flex mt-0  ml-10  lg:hidden ${
                true ? "block" : "hidden"
              }`}
            >
              <AlignLeft className="font-2xl text-[#80ED99] text-black size-9 mx-10    " />
            </SheetTrigger>

            <SheetContent className="py-24">
              <SheetTitle
                className="uppercase text-2xl semibold text-[#80ED99] "
                onClick={() => {
                  router.push("/");
                }}
              >
                Health Check
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
              <div
                className="hidden lg:flexmt-6 ml-10"
                style={{ display: `${true ? "block" : "none"}` }}
              ></div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex flex-1 justify-end gap-8 ">
          <div className="flex items-center gap-9">
            {navItem.map((d) => {
              return (
                <a
                  key={d.name}
                  className="text-[#141414] text-sm font-medium leading-normal"
                  href="#"
                >
                  {d.name}
                </a>
              );
            })}
          </div>
          <div className="flex gap-2">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded h-10 px-4 bg-[#80ED99] text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Sign up</span>
            </button>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded h-10 px-4 bg-[#F0F2F5] text-[#141414] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Log in</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
