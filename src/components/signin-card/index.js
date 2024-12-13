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
  }

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
      <div
        className="w-[100%] h-[100vh] bg-[#113D3C] flex items-center justify-center"
        id="signInContainer"
      >
        <div
          className="w-[46%] h-[100%] flex flex-col items-center justify-start"
          id="signIn"
        >
          <div
            className="w-full h-[145px] flex items-center justify-center mt-[100px]"
            id="logoContainer"
          >
            <img src="signinLogo.png"></img>
          </div>
          <div
            className="w-[460px] h-[600px] flex flex-col items-left justify-start"
            id="signInBody"
          >
            <h1 className="text-white font-bold text-3xl mt-6">
              Welcome Back!
            </h1>
            <h4 className="text-white text-[20px] mt-2">
              Enter Your Email & Password
            </h4>

            <div className="relative mt-7">
              <input
                type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}
                className="w-full p-4 border-2 border-white rounded-lg bg-transparent text-white text-[18px] focus:outline-none"
              />
              <div className="absolute top-[-8px] left-5 text-white bg-[#113D3C] px-2 text-[15px] ">
                Email
              </div>
            </div>

            <div className="relative mt-7">
              <input
                type="password"
                value={password} onChange={(e)=>{setPassword(e.target.value)}}
                className="w-full p-4 border-2 border-white rounded-lg bg-transparent text-white text-[18px] focus:outline-none"
              />
              <div className="absolute top-[-8px] left-5 text-white bg-[#113D3C] px-2 text-[15px] ">
                Password
              </div>
            </div>
            <div className="w-full h-5 mt-4 pr-3 mb-1 flex items-center justify-end text-white text-[12px] cursor-pointer active:scale-[0.99] "
             onClick={handleForgetPassword}>
              Forgot Password ?
            </div>
            <div onClick={handleSignIn} 
            className= "w-full h-12 flex items-center justify-center text-5 border-2 border-white rounded-3xl mb-5 bg-white cursor-pointer active:scale-[0.98]" id="loginButton" 
            >
               <b>Log In</b>
            </div>
            <div className="w-full h-5 mt-2 mb-1 flex items-center justify-center text-white text-[12px]">
              <img src="leftLine.png"></img>
              <b className="px-6">or Login with</b>
              <img src="rightLine.png"></img>
            </div>
            <div className="w-full h-16 mt-4 flex items-center justify-center">
              <div className="w-10 h-10 m-4 bg-white rounded-lg flex items-center justify-center cursor-pointer">
              <img src="facebookLogo.png"></img>
              </div>
              <div className="w-10 h-10 m-4 bg-white rounded-lg flex items-center cursor-pointer justify-center">
              <img src="googleLogo.png"></img>
              </div>
            
            </div>
          </div>
        </div>
        <div className="w-[54%]  h-[100%]">
          <img src=""></img>
        </div>
      </div>
    </>
  );
}
