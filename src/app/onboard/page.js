import { currentUser, fetchUser } from "@/actions";
import OnboardCard from "@/components/onboard-card";
import { redirect } from "next/navigation";

export default async function OnboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  if (ProfileUser?._id) {
    redirect("/");
  }
  return (
    <>
      <div className="">
        <OnboardCard userid={user?.userId} email={user.email} />
      </div>
    </>
  );
}
