import { auth } from "@/auth";
import TestAnswersForm from "@/components/forms/TestAnswersForm";
import { client } from "@/sanity/lib/client";
import { TEST_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Question } from "@/sanity/types";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();

  if (!session) redirect("/api/auth/signin");

  const id = (await params).id;

  const test: Question = await client.fetch(TEST_BY_ID_QUERY, { id });

  return (
    <main className="milky-background">
      <div className="text-center w-full py-2 bg-yellow text-white font-semibold text-3xl -mt-16">
        {test?.title}
      </div>

      <div className="flex justify-center items-center gap-2 my-8">
        <Image
          src={session.user?.image || ""}
          width={48}
          height={48}
          alt="Authore profile"
          className="rounded-full"
        />
        <div className="flex flex-col justify-center">
          <h3 className="font-medium text-xl">{session.user?.name}</h3>
          <p className="text-nav-grey text-sm">{session.user?.email}</p>
        </div>
      </div>

      <div className="white-container">
        <h1 className="page-heading">{test?.title}</h1>

        <div className="w-full h-[1] bg-nav-grey" />

        <TestAnswersForm test={test} />
      </div>
    </main>
  );
};

export default page;
