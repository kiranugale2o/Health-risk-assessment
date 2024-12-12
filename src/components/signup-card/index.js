"use client";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpCard() {
  const { toast } = useToast();
  const router = useRouter();
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

  function handleSignup() {
    const data = {
      email: email.trim(),
      password: password.trim(),
    };

    fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((res) => {
        console.log(res);

        if (res.success) {
          sessionStorage.setItem("email", res.email);
          router.push("/sign-up/verification-of-email");
          alert("sign up ok!");
        } else {
          alert(res.message);
          toast({
            description: res.message,
          });
        }
      });
    });
  }

  const style = {
    backgroundImage: "url('be1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "120vh", // Full height of the viewport
    margin: 0, // Remove default margin
  };
  return (
    <div
      classNameName="px-5 flex justify-evenly py-20 lg:py-10 text-white"
      style={style}
    >
      <div classNameName="hidden lg:flex py-6 w-[600px] "></div>
      <div classNameName="layout-content-container flex flex-col w-[512px] max-w-[512px] py-2 max-w-[960px] flex-1">
        <h3 classNameName="text-[#111518] tracking-light text-2xl font-bold leading-tight px-4 text-center pb-2 pt-5">
          Welcome to HealthCare
        </h3>
        <p classNameName="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-2 text-center">
          Assess your health risks and receive personalized recommendations for
          a healthier you. Join our community of 200,000 users.
        </p>
        <div classNameName="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 lg:mx-20">
          <label classNameName="flex flex-col min-w-40 flex-1">
            <p classNameName="text-[#111518] text-base font-medium leading-normal pb-2">
              Email
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              classNameName="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60778a] p-4 text-base font-normal leading-normal"
              defaultValue=""
            />
          </label>
        </div>
        <div classNameName="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 lg:mx-20">
          <label classNameName="flex flex-col min-w-40 flex-1">
            <p classNameName="text-[#111518] text-base font-medium leading-normal pb-2">
              Password
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              classNameName="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-14 placeholder:text-[#60778a] p-4 text-base font-normal leading-normal"
              defaultValue=""
            />
          </label>
        </div>
        <div classNameName="px-4 lg:mx-20">
          <label classNameName="flex gap-x-3 py-3 flex-row">
            <input
              type="checkbox"
              id="myCheckbox"
              checked={isChecked} // Use state to control checkbox checked status
              onChange={handleCheckboxChange} // Event handler for change
              classNameName="h-5 w-5 rounded border-[#dbe1e6] border-2 bg-transparent text-[#2094f3] checked:bg-[#2094f3] checked:border-[#2094f3] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#dbe1e6] focus:outline-none"
            />
            <p classNameName="text-[#111518] text-base font-normal leading-normal">
              I would like to receive health tips and news from HealthCare
            </p>
          </label>
        </div>
        <div classNameName="flex flex-col py-3 lg:mx-20">
          <div classNameName="flex  px-4 py-3">
            <button
              onClick={handleSignup}
              disabled={buttonDisabled()}
              classNameName="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#80ED99] text-black hover:bg-black hover:text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 "
            >
              <span classNameName="truncate">Join HealthCare</span>
            </button>
          </div>
          <footer classNameName="flex justify-center lg:mx-20">
            <div classNameName="flex max-w-[960px] flex-1 flex-col">
              <p classNameName="text-[#60778a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </p>
              <Link href="/sign-in">
                <p classNameName="text-[#60778a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
                  Already have an account?
                </p>
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
