import { auth } from "@/auth";
import AddQuestionForm from "@/components/forms/AddQuestionForm";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (session.role !== "ADMIN") redirect("/addQuestion/unauthorised");

  return (
    <main className="milky-background">
      <div className="white-container">
        <h1 className="page-heading">Add questions</h1>

        <AddQuestionForm />
      </div>
    </main>
  );
};

export default Page;
