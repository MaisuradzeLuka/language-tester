import Image from "next/image";
import Link from "next/link";

const Home = () => {
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
            შეამოწმე შენი ცოდნა ნებისმიერ <br />
            დროს!
          </h3>
          <p className="text-xl max-w-[450px]">
            რუსულის გრამატიკის და ლექსიკონის სწრაფი ტესტირება, პასუხებითა და
            სწრაფი შედეგით!
          </p>
        </div>

        <Link
          href="/exercises"
          className="bg-transparent hover:bg-yellow text-yellow hover:text-white text-xl px-12 py-6 border border-yellow rounded-full mr-10 z-30"
        >
          ტესტის დაწყება
        </Link>
      </div>
    </main>
  );
};

export default Home;
