export default function Navbar() {
  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#F0F2F5] px-3 lg:px-10 py-3">
        <div className="flex items-center gap-2 text-[#141414] py-3 px-0 lg:p-auto">
          <div className="size-6">
            <svg
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
          <h2 className=" lg:p-auto text-[#141414] text-[25px] font-bold leading-tight tracking-[-0.015em]">
            Health Check
          </h2>
        </div>
        <div className="hidden lg:flex flex-1 justify-end gap-8 ">
          <div className="flex items-center gap-9">
            <a
              className="text-[#141414] text-sm font-medium leading-normal"
              href="#"
            >
              Dashboard
            </a>
            <a
              className="text-[#141414] text-sm font-medium leading-normal"
              href="#"
            >
              Assessment
            </a>
            <a
              className="text-[#141414] text-sm font-medium leading-normal"
              href="#"
            >
              Education
            </a>
            <a
              className="text-[#141414] text-sm font-medium leading-normal"
              href="#"
            >
              Community
            </a>
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
