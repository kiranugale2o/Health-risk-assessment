import { currentUser } from "@/actions";
import { redirect } from "next/navigation";

export default async function forgetPasswordVerficitionOfEmail() {
  const user = await currentUser();
  if (user) redirect("/");

  return (
    <>
      <div className="lg:p-24">
        {/* <VerifyOtpCard otpVerificationType={"forget-password"} /> */}
        <h1>forget password otp</h1>
      </div>
    </>
  );
}
