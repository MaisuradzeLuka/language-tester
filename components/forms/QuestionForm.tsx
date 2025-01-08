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

interface IQuestionForm {
  index: number;
  control: Control<IFormInputs, any>;
  setValue: UseFormSetValue<IFormInputs>;
}

const QuestionForm = ({ index, control, setValue }: IQuestionForm) => {
  const [option1] = useState(generateRandomId(8));
  const [option2] = useState(generateRandomId(8));
  const [option3] = useState(generateRandomId(8));

  const t = useTranslations("AddQuestion");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    name: string
  ) => {
    setValue(name, { value: e.currentTarget.value, id, name });
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

      <h3 className="text-xl font-medium border-none -mb-2">{t("options")}</h3>

      <FormField
        control={control}
        name={`questions.${index}.correctOption`}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 ">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                className="flex flex-col lg:flex-row gap-5 lg:gap-0 lg:justify-between"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={option1} id="option-one" />
                  <FormField
                    control={control}
                    name={`questions.${index}.option1`}
                    render={() => (
                      <FormItem className="flex flex-col gap-2 w-full">
                        <FormControl>
                          <Input
                            type="text"
                            onChange={(e) =>
                              handleChange(
                                e,
                                option1,
                                `questions.${index}.option1`
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroupItem value={option2} id="option-two" />
                  <FormField
                    control={control}
                    name={`questions.${index}.option2`}
                    render={() => (
                      <FormItem className="flex flex-col gap-2 w-full">
                        <FormControl>
                          <Input
                            type="text"
                            onChange={(e) =>
                              handleChange(
                                e,
                                option2,
                                `questions.${index}.option2`
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroupItem value={option3} id="option-three" />
                  <FormField
                    control={control}
                    name={`questions.${index}.option3`}
                    render={() => (
                      <FormItem className="flex flex-col gap-2 w-full">
                        <FormControl>
                          <Input
                            type="text"
                            onChange={(e) =>
                              handleChange(
                                e,
                                option3,
                                `questions.${index}.option3`
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default QuestionForm;
