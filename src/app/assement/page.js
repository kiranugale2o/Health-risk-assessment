import { currentUser, fetchUser } from "@/actions";
import AssessmentPageCard from "@/components/assessmentCard";
import { redirect } from "next/navigation";

export default async function AssessmentPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const ProfileUser = await fetchUser(user?.userId);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }
  return (
    <>
      <div className="">
        <AssessmentPageCard />
      </div>
    </>
  );
}
