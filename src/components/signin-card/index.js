"use client";
import Link from "next/link";
import { useState } from "react";

export default function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked); // Update the state based on whether the checkbox is checked
  };

  function buttonDisabled() {
    if (email === "" || password === "" || !isChecked) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <>
      <div className="px-5 flex justify-evenly py-5">
        <div className="hidden lg:flex py-6 w-[600px] ">
          <img src="bg1.jpg" className="h-[300px] mt-10" alt="" />
        </div>
        <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1 block">
          <h1 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-center pb-3 pt-5">
            Sign In for a Health Risk Assessment
          </h1>

          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111518] text-base font-medium leading-normal pb-2">
                Email
              </p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60778a] p-4 text-base font-normal leading-normal"
                defaultValue=""
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111518] text-base font-medium leading-normal pb-2">
                Password
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60778a] p-4 text-base font-normal leading-normal"
                defaultValue=""
              />
            </label>
          </div>
          <div className="px-4">
            <label className="flex gap-x-3 py-3 flex-row">
              <input
                type="checkbox"
                id="myCheckbox"
                checked={isChecked} // Use state to control checkbox checked status
                onChange={handleCheckboxChange} // Event handler for change
                className="h-5 w-5 rounded border-[#dbe1e6] border-2 bg-transparent text-[#2094f3] checked:bg-[#2094f3] checked:border-[#2094f3] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#dbe1e6] focus:outline-none"
              />
              <p className="text-[#111518] text-base font-normal leading-normal">
                I would like to receive the weekly health newsletter
              </p>
            </label>
            <button
              variant="outline"
              type="button"
              className="text-[#60778a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline"
            >
              Forget Password ?
            </button>
          </div>
          <div className="flex flex-col px-4 py-3">
            <div className="flex  px-4 py-3">
              <button
                disabled={buttonDisabled()}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#80ED99] text-black text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 "
              >
                {" "}
                <span className="truncate">Sign In</span>
              </button>
            </div>
            <footer className="flex justify-center">
              <div className="flex max-w-[960px] flex-1 flex-col">
                <p className="text-[#60778a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
                  By signing , you agree to our Terms of Service and Privacy
                  Policy.
                </p>
                <Link href="/sign-up">
                  <p className="text-[#60778a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
                    New registration?
                  </p>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
