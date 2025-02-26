import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

const Home = async () => {
  const t = await getTranslations("HomePage");

  return (
    <main className="relative bg-no-repeat bg-cover w-full h-screen overflow-hidden">
      <div className="relative flex flex-col lg:flex-row justify-evenly lg:justify-between items-center w-full h-full">
        <Image
          src="https://www.topuniversities.com/sites/default/files/styles/articles_inline/public/articles/lead-images/aural%20learning.jpeg.webp"
          alt="bg image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />

        <div className="absolute inset-0 bg-black opacity-50" />

        <div className=" z-30 text-white ml-4 xs:ml-16">
          <h1 className="text-4xl">Language Tester</h1>
          <h3 className="text-4xl text-yellow my-6 xl:my-10">
            {t("subtitle")}
          </h3>
          <p className="text-xl max-w-[450px]">{t("paragraph")}</p>
        </div>

        <Link
          href="/exercises"
          className="bg-transparent hover:bg-yellow text-yellow hover:text-white text-xl px-12 py-6 border border-yellow rounded-full mr-10 z-30"
        >
          {t("btn")}
        </Link>
      </div>
    </main>
  );
};

export default Home;
