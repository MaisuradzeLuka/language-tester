"use client";

// prettier-ignore
import {
    FormField, FormItem, FormLabel, FormControl, FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generateRandomId } from "@/lib/utils";
import { IFormInputs } from "@/types";
import { useTranslations } from "next-intl";
import { ChangeEvent, useState } from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface IQuestionForm {
  index: number;
  control: Control<IFormInputs, any>;
  setValue: UseFormSetValue<IFormInputs>;
  questionsLength: number;
}

const QuestionForm = ({
  index,
  control,
  setValue,
  questionsLength,
}: IQuestionForm) => {
  const t = useTranslations("AddQuestion");

  const [options] = useState({
    option1: generateRandomId(8),
    option2: generateRandomId(8),
    option3: generateRandomId(8),
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    name: string
  ) => {
    setValue(name, { value: e.currentTarget.value, id, name });
    if (e.currentTarget.value.trim() === "") {
      setValue(`questions.${index}.correctOption`, ""); // Reset correctOption if input is empty
    }
  };

  return (
    <>
      <FormField
        control={control}
        name={`questions.${index}.question`}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 ">
            <FormLabel className="text-xl font-medium border-none">
              {t("question")}
            </FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`questions.${index}.text`}
        render={({ field }) => {
          return (
            <FormItem className="flex flex-col gap-2 mt-4">
              <FormLabel className="text-xl font-medium border-none">
                {t("text")}
              </FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none !h-40" />
                {/* <Input type="textarea" {...field} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <h3 className="text-xl font-medium border-none my-8">{t("options")}</h3>

      <FormField
        control={control}
        name={`questions.${index}.correctOption`}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-col lg:flex-row gap-5 lg:gap-0 lg:justify-between"
              >
                {["option1", "option2", "option3"].map((optionKey, i) => {
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <RadioGroupItem
                        value={options[optionKey]}
                        id={`option-${i + 1}`}
                      />
                      <FormField
                        control={control}
                        name={`questions.${index}.${optionKey}`}
                        render={({ field: optionField }) => (
                          <FormItem className="flex flex-col gap-2 w-full">
                            <FormControl>
                              <Input
                                type="text"
                                {...optionField}
                                value={optionField.value?.value || ""}
                                onChange={(e) =>
                                  handleChange(
                                    e,
                                    options[optionKey],
                                    `questions.${index}.${optionKey}`
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {index + 1 !== questionsLength ? (
        <div className="w-[90%] h-[1] mx-auto bg-nav-grey  my-12" />
      ) : (
        ""
      )}
    </>
  );
};

export default QuestionForm;
