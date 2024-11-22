import { currentUser } from "@/actions";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const user = await currentUser();
  if (user) redirect("/");
  return (
    <>
      <div className="p-auto ">
        <h1>sign in</h1>
      </div>
    </>
  );
}
