"use client";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogoImg } from "../images";

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
    <div className="container flex flex-wrap max-w-6xl w-11/12 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="form-section flex-1 p-8 bg-[#003d33] text-white text-center">
        <div className="logo mb-6 mt-[40px]  px-[120px]">
          <LogoImg w={240} h={145} />
        </div>
        <h2 class="text-2xl mb-4">Create an Account</h2>

        <p className="text-sm mb-6">Let's get Started!</p>
        <form action="#">
          <input
            type="text"
            placeholder="Name"
            required=""
            className="w-4/5 p-4 mb-3 border-3 border-white rounded-lg bg-[#003d33] text-white text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            required=""
            className="w-4/5 p-4 mb-3 border-3 border-white rounded-lg bg-[#003d33] text-white text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            required=""
            className="w-4/5 p-4 mb-3 border-3 border-white rounded-lg bg-[#003d33] text-white text-sm"
          />
          <button
            type="submit"
            className="w-4/5 p-3 mb-3 bg-[#4caf50] text-white rounded-full font-bold"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="w-4/5 p-3 mb-3 bg-white text-[#003d33] border-2 border-[#003d33] rounded-full font-bold"
          >
            Continue with Email
          </button>
          <p className="mt-4">
            Already have an account?{" "}
            <a href="#" className="text-[#80cbc4]">
              Log In
            </a>
          </p>
        </form>
      </div>
      <div className="image-section flex-1 flex justify-center items-center overflow-hidden">
        <svg
          width={680}
          height={832}
          viewBox="0 0 680 832"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <mask
            id="mask0_58_183"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={680}
            height={832}
          >
            <path d="M0 0H680V832H0V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_58_183)">
            <rect
              y="-0.636627"
              width="681.046"
              height="832.636"
              fill="url(#pattern0_58_183)"
            />
          </g>
          <defs>
            <pattern
              id="pattern0_58_183"
              patternContentUnits="objectBoundingBox"
              width={1}
              height={1}
            >
              <use
                xlinkHref="#image0_58_183"
                transform="matrix(0.00134794 0 0 0.00110254 -0.0467677 0.000216648)"
              />
            </pattern>
          </defs>
        </svg>
      </div>
    </div>
  );
}
