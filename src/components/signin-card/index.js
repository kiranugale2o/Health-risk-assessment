"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogoImg } from "../images";

export default function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked); // Update the state based on whether the checkbox is checked
  };

  const buttonDisabled = () => {
    if (email === "" || password === "") {
      return true;
    } else {
      return false;
    }
  };

  function handleSignIn() {
    const currentSignInData = {
      email: email,
      password: password,
    };
    fetch("/api/sign-in", {
      method: "POST",
      body: JSON.stringify(currentSignInData),
    }).then((res) =>
      res.json().then((res) => {
        if (res.success) {
          Cookies.set("healthcare", res.token);
          alert(res.message);
          router.refresh("/sign-in");
        } else {
          alert(res.message);
        }
      })
    );
  }

  //forget Password Handler
  async function handleForgetPassword() {
    sessionStorage.setItem("email", email);
    //setEmail as Session Storage
    sessionStorage.setItem("email", email);
    if (email === "") {
      alert("First Enter Your Email");
      return;
    }
    fetch("/api/sign-in/forgetPassword", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).then((res) =>
      res.json().then((res) => {
        if (res.success) {
          router.push("/sign-in/forgetPassword-email-verify");
        } else {
          alert(res.message);
        }
      })
    );
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
    <>
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
              Welcome Back!
            </h1>
            <div className=" text-white text-start font-exo-2 font-medium font-sans text-[24px] leading-[24px] mt-2">
              Enter Your Email & Password
            </div>
            <div className="relative mt-7">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-[460px] h-[60px] p-4 border-2 border-white rounded-lg bg-transparent text-white text-[18px] hover:bg-bg-transparent focus:outline-none focus:bg-transparent"
              />
              <div className="absolute top-[-8px] left-5 text-white bg-[#113D3C] px-2 text-[15px] ">
                Email
              </div>
            </div>

            <div className="relative mt-7">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-[460px] h-[60px] p-4 border-2 border-white rounded-lg bg-transparent text-white text-[18px] hover:bg-bg-transparent focus:outline-none focus:bg-transparent"
              />
              <div className="absolute top-[-8px] left-5 text-white bg-[#113D3C] px-2 text-[15px] ">
                Password
              </div>
            </div>
            <h1
              className="w-full h-5 mt-4  text-end mb-1 flex text-white text-[12px] cursor-pointer active:scale-[0.99] "
              onClick={handleForgetPassword}
            >
              Forgot Password ?
            </h1>
            <div
              onClick={handleSignIn}
              className="w-[460px] h-12 mt-0 flex p-5 items-center justify-center tborder-2 border-white rounded-3xl mb-5 text-[#113D3C] font-exo-2 font-semibold text-[18px] leading-[24px] bg-white  cursor-pointer active:scale-[0.98]"
              id="loginButton"
            >
              <b>Log In</b>
            </div>
            <div className="w-[460px] h-5 mt-2 mb-1 flex items-center justify-center text-white text-[12px]">
              <img src="leftLine.png"></img>
              <b className="px-6">or Login with</b>
              <img src="rightLine.png"></img>
            </div>
            <div className="w-[460px] h-16 mt-4 flex items-center justify-center">
              <div className="w-10 h-10 m-4 bg-white rounded-lg flex items-center justify-center cursor-pointer">
                <img src="facebookLogo.png"></img>
              </div>
              <div className="w-10 h-10 m-4 bg-white rounded-lg flex items-center cursor-pointer justify-center">
                <img src="googlelogo.png"></img>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[54%]  h-[100%]">
          <img src="signupbanner.png"></img>
        </div>
      </div>
    </>
  );
}
