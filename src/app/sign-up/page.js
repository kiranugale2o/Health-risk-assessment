import { currentUser } from "@/actions";
import SignUpCard from "@/components/signup-card";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const user = await currentUser();
  if (user) redirect("/");
  return (
    <>
      <div classNameName="p-auto ">
        <SignUpCard />
      </div>
    </>
  );
}
