"use client";

import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Button } from "../ui/button";
import {
  CardContent,
  CardHeader,
  CardTitle,
  Card,
  CardDescription,
} from "../ui/card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Cookie } from "next/font/google";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function VerifyOtpCard({ otpVerificationType }) {
  const { toast } = useToast();
  const router = useRouter();
  const [currentOtp, setCurrentOtp] = useState("");
  const [warningDis, setWarningDis] = useState("none");
  const [email, setEmail] = useState("");
  const [incorrectOtpDis, setIncorrectOtp] = useState("none");
  const [expriyOtpDis, setExpriesOtp] = useState("none");
  const [seconds, setSeconds] = useState(60); // Initialize countdown with 60 seconds
  const [resendText, setResendText] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access sessionStorage here
      const value = sessionStorage.getItem("email");
      setEmail(value);
    }

    if (seconds === 0) {
      setResendText(false);
      return;
    } // Stop the timer when it reaches 0
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [seconds]);

  async function otpChecker() {
    if (currentOtp.length === "") {
      setWarningDis("block");
    } else {
      setWarningDis("none");
      const data = {
        email,
        otp: currentOtp,
      };
      if (otpVerificationType === "forget-password") {
        fetch("/api/sign-in/forgetPassword/verification-otp", {
          method: "POST",
          body: JSON.stringify(data),
        }).then((res) =>
          res.json().then((res) => {
            if (res.success) {
              setIncorrectOtp("none");
              setExpriesOtp("none");
              setWarningDis("none");
              router.push("/sign-in/setNewPassword");
            } else {
              console.log("server");
              if (res.status === 1) {
                setIncorrectOtp("block");
              } else {
                setExpriesOtp("block");
              }

              toast({
                title: res.message,
              });
            }
          })
        );
      } else {
        fetch("/api/verifyotp", {
          method: "POST",
          body: JSON.stringify(data),
        }).then((res) => {
          res.json().then((res) => {
            if (res.success) {
              //this code for sign-up Email Verification
              toast({
                description: "SignUp Successfully !",
              });
              Cookies.set("healthcare", res.token);
              setIncorrectOtp("none");
              setExpriesOtp("none");
              setWarningDis("none");
              router.refresh("/");
              sessionStorage.removeItem("email");
            } else {
              if (res.status === 1) {
                setIncorrectOtp("block");
              } else {
                setExpriesOtp("block");
              }
            }
          });
        });
      }
    } //else close
  }

  //handle resend otp function
  async function handleResendOtp() {
    fetch("/api/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).then((res) =>
      res.json().then((res) => {
        if (res.success) {
          setSeconds(60);
          setIncorrectOtp("none");
          setExpriesOtp("none");
          setWarningDis("none");
          toast({
            title: "Otp send !",
          });
        } else {
          toast({
            title: "Otp not send try again !",
          });
        }
      })
    );
  }
  // Determine if the button should be disabled
  const isDisabled = seconds === 0;
  return (
    <>
      <Card className=" mt-20  w-[350px] mx-auto lg:mt-auto shadow flex flex-col lg:w-[400px] item-center">
        <CardHeader className="p-6 ml-auto mr-auto mt-auto">
          <CardTitle className="text-[22px] mx-auto">
            Verify your email
          </CardTitle>
          <CardDescription className="mx-auto flex flex-col ">
            <p>Enter the verification code sent to your email</p>
            <p className="mx-auto">{email}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="justify-between">
          <form action={otpChecker} className="">
            <div className="flex w-full gap-5 mx-10 grid-col-gap-3">
              <div className="mx-5">
                <InputOTP
                  maxLength={6}
                  value={currentOtp}
                  onChange={(value) => setCurrentOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div
              className="text-[13px] mx-auto mt-3   text-center  text-red-600 "
              style={{ display: `${expriyOtpDis}` }}
            >
              Otp expired !
            </div>
            <div
              className="text-[13px] mx-auto mt-3  text-center   text-red-600 "
              style={{ display: `${incorrectOtpDis}` }}
            >
              Incorrect code !
            </div>
            <div
              className="text-[13px]  mt-3  text-center  font-semibold  text-red-600 "
              style={{ display: `${warningDis}` }}
            >
              Enter Code .
            </div>
            <Button
              variant="outline"
              size=""
              type="button"
              disabled={resendText}
              onClick={handleResendOtp}
              className="ml-10 border-none hover:border-none hover:bg-color-none  "
            >
              Didn’t receive a code? Resend ({seconds})
            </Button>
            <br />
            <Button className="mt-5 w-full hover:bg-[#80ED99]" type="submit">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
