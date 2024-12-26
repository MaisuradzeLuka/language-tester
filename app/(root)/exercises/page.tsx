import { client } from "@/sanity/lib/client";
import { TESTS_QUERY } from "@/sanity/lib/queries";
import { ITest } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { SiTicktick } from "react-icons/si";

const page = async () => {
  const retrivedTests = await client.fetch(TESTS_QUERY);

  return (
    <div className="w-full px-4">
      <div className="flex justify-center items-center w-full h-12 bg-yellow text-white font-semibold text-2xl my-4">
        ტესტები
      </div>

      <section className="grid grid-cols-2 xs:grid-cols-3 justify-between gap-2 xs:gap-4 lg:gap-6 max-w-[1080px] mx-auto">
        {retrivedTests.map((test: any) => (
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

            <div className="w-full flex justify-center items-center text-xs md:text-sm h-6 md:h-8 bg-yellow">
              <p className="flex items-center gap-2 text-white ">
                <span className=" text-nav-grey ">
                  <SiTicktick />
                </span>
                Language Tester
              </p>
            </div>

            <div className="mx-4 my-6 text-xs md:text-sm">
              <p className="font-semibold text-lg text-gray-500">
                {test.title}
              </p>
              <p className="font-medium text-gray-500">{test.author.name}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default page;
