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
    <div className="container flex  w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="form-section flex-1 p-8 bg-[#003d33] text-white text-center">
        <div className="logo  mt-[40px]  px-[120px]">
          <LogoImg w={240} h={145} />
        </div>
        <div
          className="w-[460px] h-[500px] mt-5 flex flex-col  px-[70px] gap-2"
          id="signInBody"
        >
          <h1 className="text-white text-start font-bold text-3xl font-sans  font-bold text-[34px] leading-[41px] mt-2">
            Create an Account
          </h1>
          <div class=" text-white text-start font-exo-2 font-medium font-sans text-[24px] leading-[24px] mt-2">
            Let’s get Started!
          </div>

          <div className="relative mt-7 ">
            <input
              type="email"
              required
              autocomplete="off"
              className="w-[460px] h-[60px] p-4 border-2 border-white rounded-lg bg-transparent text-white text-[18px] hover:bg-bg-transparent focus:outline-none focus:bg-transparent"
            />
            <div className="absolute top-[-8px] left-5 text-white bg-[#113D3C] px-2 text-[18px] ">
              Email
            </div>
          </div>

          <div className="relative mt-7">
            <input
              type="password"
              required
              autocomplete="off"
              className="w-[460px] h-[60px] p-4 border-2 border-white rounded-lg bg-transparent text-white text-[18px] focus:outline-none"
            />
            <div className="absolute top-[-8px] left-5 text-white bg-[#113D3C] px-2 text-[18px] ">
              Password
            </div>
          </div>

          <div
            className="w-[460px] h-12 mt-10 flex items-center justify-center tborder-2 border-white rounded-3xl mb-5 text-[#113D3C] font-exo-2 font-semibold text-[18px] leading-[24px] bg-white  cursor-pointer active:scale-[0.98]"
            id="loginButton"
          >
            <b>Sign Up</b>
          </div>

          <div class=" h-[19px] text-center text-white font-exo-2 font-normal text-[16px] leading-[19px]">
            Already have an account?{" "}
            <a href="#" class="underline font-bold">
              Log In
            </a>
          </div>
        </div>
      </div>

      <div className=" w-[54%] h-[300px]  ">
        <img src="signupbanner.png" />
      </div>
    </div>
  );
}
