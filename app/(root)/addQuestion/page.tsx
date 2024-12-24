import { auth } from "@/auth";
import AddQuestionForm from "@/components/forms/AddQuestionForm";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/api/auth/signin");

  return (
    <section className="bg-milky-white min-h-screen px-2 py-20">
      <div className="flex flex-col gap-12 bg-white mx-auto border border-gray-200 rounded-md px-4 py-8 lg:w-[960px]">
        <h1 className="text-yellow text-4xl font-semibold text-center">
          Add questions
        </h1>

        <AddQuestionForm />
      </div>
    </section>
  );
};

export default Page;
