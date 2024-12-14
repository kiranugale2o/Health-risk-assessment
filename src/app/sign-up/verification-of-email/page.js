import { currentUser } from "@/actions";
import VerifyOtpCard from "@/components/verify-otp-card";
import { redirect } from "next/navigation";

export default async function VerficitionOfEmail() {
  const user = await currentUser();
  if (user) redirect("/");

  return (
    <>
      <div className="p-auto">
        {/* <VerifyOtpCard otpVerificationType={"sign-up"} /> */}
        <VerifyOtpCard otpVerificationType={"sign-up"} />
      </div>
    </>
  );
}
