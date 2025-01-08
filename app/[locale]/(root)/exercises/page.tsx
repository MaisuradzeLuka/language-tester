import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { TESTS_QUERY } from "@/sanity/lib/queries";
import { Question, User as UserType } from "@/sanity/types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { redirect } from "next/navigation";
import { SiTicktick } from "react-icons/si";

type TestsType = Omit<Question, "author"> & { author?: UserType };

const page = async () => {
  const session = await auth();

  const t = await getTranslations("Exercises");

  if (!session) redirect("/api/auth/signin");

  const retrivedTests: TestsType[] = await client
    .withConfig({ useCdn: false })
    .fetch(TESTS_QUERY);

  return (
    <main className="w-full px-4">
      <div className="flex-between w-full h-12 bg-yellow text-white font-semibold text-2xl my-4 pl-4">
        {t("title")}
      </div>

      <section className="grid grid-cols-1 xs:grid-cols-3 justify-between gap-5 xs:gap-4 lg:gap-6 max-w-[1080px] mx-auto">
        {retrivedTests.map((test) => (
          <Link
            key={test._id}
            className="w-full rounded-xl shadow-slate-500 shadow-md hover:scale-105 duration-75"
            href={`/exercises/${test._id}`}
          >
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwKefSyvMP__x62IHxBfgxpvFw4BFa99N3wg&s"
              width={400}
              height={200}
              alt="card-bg-image"
              className=" aspect-video rounded-t-xl"
            />

            <div className="w-full flex-between text-xs md:text-sm h-6 md:h-8 bg-yellow pl-2 md:pl-4">
              <p className="flex items-center gap-2 text-white ">
                <span className=" text-nav-grey ">
                  <SiTicktick />
                </span>
                Language Tester
              </p>
            </div>

            <div className="mx-2 md:mx-4 my-6 text-xs md:text-sm">
              <p className="font-semibold text-[16px] mb-3 md:text-lg text-gray-500">
                {test.title}
              </p>
              <p className="font-medium text-gray-500">
                {test?.author?.name || ""}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default page;
