import { currentUser } from "@/actions";
import { redirect } from "next/navigation";

export default async function ResetPasswords() {
  const user = await currentUser();
  if (user) redirect("/");

  return (
    <>
      <div className="lg:p-24">
        <h1>Reset password</h1>
      </div>
    </>
  );
}
