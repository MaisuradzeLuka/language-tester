import { auth } from "@/auth";
import TestAnswersForm from "@/components/forms/TestAnswersForm";
import { client } from "@/sanity/lib/client";
import { TEST_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Question } from "@/sanity/types";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();

  const id = (await params).id;

  const test: Question = await client.fetch(TEST_BY_ID_QUERY, { id });

  if (!session) redirect("/api/auth/signin");

  return (
    <main className="milky-background">
      <div className="white-container">
        <h1 className="page-heading">{test?.title}</h1>

        <TestAnswersForm test={test} />
      </div>
    </main>
  );
};

export default page;
