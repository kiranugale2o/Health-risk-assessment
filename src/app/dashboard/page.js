import { currentUser, fetchUser } from "@/actions";
import DashboardCard from "@/components/dashboard-page";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  console.log(user);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }
  return (
    <>
      <DashboardCard user={user} ProfileUser={ProfileUser} />
    </>
  );
}
