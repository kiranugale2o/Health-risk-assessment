import { currentUser, fetchUser } from "@/actions";
import AssessmentPageCard from "@/components/assessmentCard";
import { redirect } from "next/navigation";

export default async function AssessmentPage() {
  const user = await currentUser();

  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);

  return (
    <>
      <div classNameName="">
        <AssessmentPageCard email={user?.email} />
      </div>
    </>
  );
}
