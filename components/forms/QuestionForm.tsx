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
import { ChangeEvent } from "react";
import { Control, useFieldArray, UseFormSetValue } from "react-hook-form";
import { Textarea } from "../ui/textarea";

// interface OptionValues {
//   option1: string;
//   option2: string;
//   option3: string;
//   correctOption: string;
//   [key: string]: string; // Index signature
// }

interface IQuestionForm {
  index: number;
  control: Control<IFormInputs, any>;
  setValue: UseFormSetValue<IFormInputs>;
  // optionValues: OptionValues;
  questionsLength: number;
  type: "text" | "select";
}

const QuestionForm = ({
  index,
  control,
  setValue,
  // optionValues,
  questionsLength,
  type,
}: IQuestionForm) => {
  const t = useTranslations("AddQuestion");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    name: `questions.${number}.options.${number}`
  ) => {
    setValue(name, { value: e.currentTarget.value, customId: id, name });
    // if (e.currentTarget.value.trim() === "") {
    //   setValue(`questions.${index}.correctOption`, "");
    // }
  };

  const { fields } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

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

      {type === "text" && (
        <FormField
          control={control}
          name={`questions.${index}.text`}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 ">
              <FormLabel className="text-xl font-medium border-none mt-8">
                {t("text")}
              </FormLabel>

              <FormControl>
                <Textarea rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <h3 className="text-xl font-medium border-none my-8">{t("options")}</h3>

      <FormField
        control={control}
        name={`questions.${index}.correctOption`}
        render={({ field }) => {
          return (
            <FormItem className="flex flex-col gap-2">
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col lg:flex-row gap-5 lg:gap-0 lg:justify-between"
                >
                  {fields.map((option, i) => {
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <RadioGroupItem value={option.id} />

                        <FormField
                          control={control}
                          name={`questions.${index}.options.${i}`}
                          render={({ field: optionField }) => (
                            <FormItem className="flex flex-col gap-2 w-full">
                              <FormControl>
                                <Input
                                  type="text"
                                  {...optionField}
                                  value={optionField.value?.value || ""}
                                  onChange={(e) =>
                                    handleChange(e, "f", optionField.name)
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
          );
        }}
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
