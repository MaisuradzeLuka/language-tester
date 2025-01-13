"use client";

import { Question } from "@/sanity/types";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { answereTest } from "@/lib/actions";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const TestAnswersForm = ({ test }: { test: Question }) => {
  const pathName = usePathname();

  const t = useTranslations("Exercise");

  const [answers, setAnswers] = useState<{ name: string; value: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find((answer) => answer.name === name);

      if (existingAnswer) {
        return prevAnswers.map((answer) =>
          answer.name === name ? { ...answer, value } : answer
        );
      } else {
        return [...prevAnswers, { name, value }];
      }
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const result = await answereTest(answers, test._id);

    const locale = pathName.slice(0, 3);

    if (result.status === "Success") {
      redirect(`${locale}/exercises/${test._id}/results`);
    } else {
      console.log(result);
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {test.questions?.map((question, index) => {
        const questionKey = question._key || `question-${index}`;

        return (
          <>
            <div key={questionKey} className="mb-20">
              <div className="flex items-center gap-3">
                <span className="flex-between rounded-full !justify-center w-8 h-8 bg-yellow text-white font-semibold text-xl">
                  {index + 1}
                </span>
                <h3 className="text-xl font-semibold">{question.question}</h3>
              </div>

              <ul className="flex flex-col lg:flex-row lg:justify-between flex-wrap gap-y-6 mt-7">
                {[question.option1, question.option2, question.option3].map(
                  (option, i) => (
                    <li key={i}>
                      <input
                        type="radio"
                        name={`radio-group-of-${questionKey}`}
                        id={`${questionKey}-${i}`}
                        value={option?.id}
                        onChange={handleChange}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`${questionKey}-${i}`}
                        className="bg-gray-200 py-2 px-4 border border-gray-400 cursor-pointer peer-checked:border-yellow peer-checked:bg-white peer-checked:text-yellow transition-colors"
                      >
                        {option?.value}
                      </label>
                    </li>
                  )
                )}
              </ul>
            </div>

            {index + 1 !== test.questions?.length ? (
              <div className="w-full h-[1] bg-nav-grey mb-14" />
            ) : (
              ""
            )}
          </>
        );
      })}

      <Button
        type="submit"
        className="hover:bg-black bg-yellow disabled:bg-nav-grey"
        disabled={isLoading}
      >
        {isLoading ? t("submiting") : t("submit")}
      </Button>
    </form>
  );
};

export default TestAnswersForm;
