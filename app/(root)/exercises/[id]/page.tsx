import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { TEST_BY_ID_QUERY } from "@/sanity/lib/queries";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();

  const id = (await params).id;

  const test = await client.fetch(TEST_BY_ID_QUERY, { id });

  if (!session) redirect("/api/auth/signin");

  return <div></div>;
};

export default page;
