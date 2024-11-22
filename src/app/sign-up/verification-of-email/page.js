import { currentUser } from "@/actions";
import { redirect } from "next/navigation";

export default async function VerficitionOfEmail() {
  const user = await currentUser();
  if (user) redirect("/");

  return (
    <>
      <div className="lg:p-24">
        {/* <VerifyOtpCard otpVerificationType={"sign-up"} /> */}
        <h1>verification otp sign up</h1>
      </div>
    </>
  );
}
