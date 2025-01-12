import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { RESULTS_BY_ID_QUERY, TEST_BY_ID_QUERY } from "@/sanity/lib/queries";
import { AnsweredTest, Question } from "@/sanity/types";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();

  const id = (await params).id;

  const t = await getTranslations("Results");

  const test: Question = await client.fetch(TEST_BY_ID_QUERY, { id });
  const results: AnsweredTest = await client
    .withConfig({ useCdn: false })
    .fetch(RESULTS_BY_ID_QUERY, { id });

  interface IOption {
    name?: string;
    value?: string;
    id?: string;
  }

  const checkAnswers = (
    option: IOption,
    correctOptionId: string,
    questionKey: string,
    results: AnsweredTest
  ) => {
    if (!results || !results.answers) {
      return <span className="text-black">{option.value}</span>;
    }

    const answer = results.answers.find(
      (ans) => ans.name === `radio-group-of-${questionKey}`
    );

    let colorClass = "text-black";

    if (answer) {
      if (option.id === correctOptionId) {
        colorClass = "text-green-500";
      } else if (answer.value === option.id) {
        colorClass = "text-red-500";
      }
    }

    if (!answer || answer.value !== correctOptionId) {
      if (option.id === correctOptionId) {
        colorClass = "text-green-500 font-bold";
      }
    }

    return <span className={colorClass}>{option.value}</span>;
  };

  if (!session) redirect("/api/auth/signin");

  return (
    <main className="milky-background">
      <div className="white-container">
        <h1 className="page-heading">{t("title")}</h1>

        {test.questions?.map((question, index) => (
          <div key={question._key} className="mb-20">
            <div className="flex items-center gap-3">
              <span className=" flex-between rounded-full !justify-center w-8 h-8 bg-yellow text-white font-semibold text-xl">
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold">{question.question}</h3>
            </div>

            <ul className="flex flex-col lg:flex-row lg:justify-between flex-wrap gap-y-6 mt-7">
              <li>
                {checkAnswers(
                  question.option1!,
                  question.correctOption!,
                  question._key,
                  results
                )}
              </li>
              <li>
                {checkAnswers(
                  question.option2!,
                  question.correctOption!,
                  question._key,
                  results
                )}
              </li>
              <li>
                {checkAnswers(
                  question.option3!,
                  question.correctOption!,
                  question._key,
                  results
                )}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
};

export default page;
