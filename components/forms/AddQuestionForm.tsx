"use client";

import { questionsSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import QuestionForm from "./QuestionForm";
import { IFormInputs } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { createQuestion } from "@/lib/actions";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";

const AddQuestionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof questionsSchema>>({
    resolver: zodResolver(questionsSchema),
    defaultValues: {
      title: "",
      questions: [
        {
          question: "",
          option1: { name: "", value: "", id: "" },
          option2: { name: "", value: "", id: "" },
          option3: { name: "", value: "", id: "" },
          correctOption: "",
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = async (data: IFormInputs) => {
    console.log(data);

    setIsLoading(true);

    const result = await createQuestion(data);

    if (result.status === "Success") {
      form.reset();
      redirect("/exercises");
    } else {
      console.log(result);
    }

    setIsLoading(false);
  };

  const onClick = () => {
    append({
      question: "",
      option1: { name: "", value: "", id: "" },
      option2: { name: "", value: "", id: "" },
      option3: { name: "", value: "", id: "" },
      correctOption: "",
    });
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
                Title
              </FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((question, index) => (
          <QuestionForm
            key={question.id}
            control={form.control}
            index={index}
            setValue={form.setValue}
          />
        ))}

        <div className="flex justify-between">
          <Button
            type="submit"
            className={
              isLoading ? "bg-gray-700 cursor-default" : "hover:bg-yellow"
            }
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
          <Button
            type="button"
            onClick={onClick}
            className="bg-yellow hover:bg-nav-grey"
          >
            Add Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddQuestionForm;
