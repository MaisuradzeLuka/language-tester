"use client";

import { Question } from "@/sanity/types";
import { ChangeEvent, useActionState } from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { answereTest } from "@/lib/actions";

const TestAnswersForm = ({ test }: { test: Question }) => {
  const { data: session } = useSession();

  const answers: { name: string; value: string }[] = [];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const existingAnswer = answers.find(
      (answer) => answer.name === e.currentTarget.name
    );

    if (existingAnswer) {
      existingAnswer.value = e.currentTarget.value;
    } else {
      answers.push({
        name: e.currentTarget.name,
        value: e.currentTarget.value,
      });
    }
  };

  const handleSubmit = async () => {
    const result = await answereTest(answers);

    // if (result.status === "Success") {
    //   redirect("/exercises");
    // } else {
    //   console.log(result);
    // }
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, null);

  return (
    <form action={formAction}>
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
              <input
                type="radio"
                name={"radio-group-of" + question._key}
                id={question.option1}
                value={question.option1}
                onChange={(e) => handleChange(e)}
                className="hidden peer"
              />
              <label
                htmlFor={question.option1}
                className="bg-gray-200 py-2 px-4 border border-gray-400 cursor-pointer peer-checked:border-yellow peer-checked:bg-white peer-checked:text-yellow  transition-colors"
              >
                {question.option1}
              </label>
            </li>
            <li>
              <input
                type="radio"
                name={"radio-group-of" + question._key}
                id={question.option2}
                value={question.option2}
                onChange={(e) => handleChange(e)}
                className="hidden peer"
              />
              <label
                htmlFor={question.option2}
                className="bg-gray-200 py-2 px-4 border border-gray-400 cursor-pointer peer-checked:border-yellow peer-checked:bg-white peer-checked:text-yellow transition-colors"
              >
                {question.option2}
              </label>
            </li>
            <li>
              <input
                type="radio"
                name={"radio-group-of" + question._key}
                id={question.option3}
                value={question.option3}
                onChange={(e) => handleChange(e)}
                className="hidden peer"
              />
              <label
                htmlFor={question.option3}
                className="bg-gray-200 py-2 px-4 border border-gray-400 cursor-pointer peer-checked:border-yellow peer-checked:bg-white peer-checked:text-yellow transition-colors"
              >
                {question.option3}
              </label>
            </li>
          </ul>
        </div>
      ))}

      <Button
        type="submit"
        className={
          isPending ? "bg-gray-700 cursor-default" : "hover:bg-black bg-yellow"
        }
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Submit"}
      </Button>
    </form>
  );
};

export default TestAnswersForm;
