import { client } from "@/sanity/lib/client";
import { TEST_BY_ID_QUERY } from "@/sanity/lib/queries";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const test = await client.fetch(TEST_BY_ID_QUERY, { id });

  return <div></div>;
};

export default page;
