import { currentUser, fetchUser } from "@/actions";
import AssessmentPageCard from "@/components/assessmentCard";
import { redirect } from "next/navigation";

export default async function AssessmentPage() {
  return (
    <>
      <div className="">
        <AssessmentPageCard />
      </div>
    </>
  );
}
