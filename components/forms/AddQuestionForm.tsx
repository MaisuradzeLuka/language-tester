"use client";

import { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import { questionsSchema } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

// prettier-ignore
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "../ui/form";
// prettier-ignore
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import QuestionForm from "./QuestionForm";
import { RxCross2 } from "react-icons/rx";

import { createOrReplaceQuestion, fetchTest } from "@/lib/actions";

import { Question } from "@/sanity/types";
import { IFormInputs } from "@/types";

const basicQuestionSchema = {
  question: "",
  options: [
    { name: "", value: "", customId: "" },
    { name: "", value: "", customId: "" },
    { name: "", value: "", customId: "" },
  ],
  correctOption: "",
};

const AddQuestionForm = () => {
  const t = useTranslations("AddQuestion");

  // useEffect(() => {
  //   const testId = JSON.parse(sessionStorage.getItem("testId") || "null");

  //   if (testId) {
  //     fetchTest(testId).then((fetchedTest: Question) => {
  //       form.reset({
  //         title: fetchedTest.title || "",
  //         questions: fetchedTest.questions?.map((q) => ({
  //           question: q.question || "",
  //           option1: {
  //             name: q.option1?.name || "",
  //             value: q.option1?.value || "",
  //             id: q.option1?.id || "",
  //           },
  //           option2: {
  //             name: q.option2?.name || "",
  //             value: q.option2?.value || "",
  //             id: q.option2?.id || "",
  //           },
  //           option3: {
  //             name: q.option3?.name || "",
  //             value: q.option3?.value || "",
  //             id: q.option3?.id || "",
  //           },
  //           correctOption: q.correctOption || "",
  //         })),
  //       });
  //     });

  //     sessionStorage.removeItem("testId");
  //   }
  // }, []);

  const pathName = usePathname();

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof questionsSchema>>({
    resolver: zodResolver(questionsSchema),
    defaultValues: {
      title: "",
      questions: [
        {
          ...basicQuestionSchema,
          type: "select",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = async (data: IFormInputs) => {
    setIsLoading(true);

    const result = await createOrReplaceQuestion(data);

    if (result.status === "Success") {
      form.reset();

      const locale = pathName.slice(0, 3);

      redirect(locale + "/exercises");
    } else {
      console.log(result);
    }

    setIsLoading(false);
  };

  const onClick = (value: string) => {
    if (value === "select") {
      append({
        ...basicQuestionSchema,
        type: "select",
      });
    } else {
      append({
        text: "",
        ...basicQuestionSchema,
        type: "text",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-md"
      >
        <FormField
          control={form.control}
          name={`title`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 ">
              <FormLabel className="text-xl font-medium border-none">
                {t("title")}
              </FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((question, index) => {
          switch (question.type) {
            case "select":
              // const optionValues: any = {
              //   option1: question.option1.id,
              //   option2: question.option2.id,
              //   option3: question.option3.id,
              //   correctOption: question.correctOption,
              // };

              return (
                <div key={question.id} className="relative group">
                  <QuestionForm
                    control={form.control}
                    index={index}
                    setValue={form.setValue}
                    // optionValues={optionValues}
                    questionsLength={fields.length}
                    type="select"
                  />

                  <button
                    className="absolute top-1 right-0 text-red-500 duration-300 group-hover:block hover:scale-125 hidden"
                    onClick={() => remove(index)}
                  >
                    <RxCross2 />
                  </button>
                </div>
              );

            case "text":
              return (
                <div key={question.id} className="relative group">
                  <QuestionForm
                    control={form.control}
                    index={index}
                    setValue={form.setValue}
                    // optionValues={optionValues}
                    questionsLength={fields.length}
                    type="text"
                  />

                  <button
                    className="absolute top-1 right-0 text-red-500 duration-300 group-hover:block hover:scale-125 hidden"
                    onClick={() => remove(index)}
                  >
                    <RxCross2 />
                  </button>
                </div>
              );
          }
        })}

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 lg:justify-between">
          <Button
            type="submit"
            className={
              isLoading ? "bg-gray-700 cursor-default" : "hover:bg-yellow"
            }
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : t("submit")}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                className="bg-yellow hover:bg-nav-grey outline-0"
              >
                {t("addQuestion")}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem textValue="select">
                  <button
                    value="select"
                    onClick={(e) => onClick(e.currentTarget.value)}
                  >
                    Select
                  </button>
                </DropdownMenuItem>

                <DropdownMenuItem textValue="text">
                  <button
                    value="text"
                    onClick={(e) => onClick(e.currentTarget.value)}
                  >
                    Text
                  </button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </form>
    </Form>
  );
};

export default AddQuestionForm;
