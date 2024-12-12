import { currentUser } from "@/actions";
import VerifyOtpCard from "@/components/verify-otp-card";
import { redirect } from "next/navigation";

export default async function VerficitionOfEmail() {
  const user = await currentUser();
  if (user) redirect("/");

  return (
    <>
      <div classNameName="lg:p-24">
        {/* <VerifyOtpCard otpVerificationType={"sign-up"} /> */}
        <VerifyOtpCard otpVerificationType={"sign-up"} />
      </div>
    </>
  );
}
