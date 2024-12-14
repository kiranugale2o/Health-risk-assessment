import { currentUser } from "@/actions";
import VerifyOtpCard from "@/components/verify-otp-card";
import { redirect } from "next/navigation";

export default async function forgetPasswordVerficitionOfEmail() {
  const user = await currentUser();
  if (user) redirect("/");

  return (
    <>
      <div className="mt-5 lg:p-auto">
        <VerifyOtpCard otpVerificationType={"forget-password"} />
      </div>
    </>
  );
}
