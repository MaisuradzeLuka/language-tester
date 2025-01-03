"use client";

// prettier-ignore
import {
    FormField, FormItem, FormLabel, FormControl, FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generateRandomId } from "@/lib/utils";
import { IFormInputs } from "@/types";
import { useState } from "react";
import { Control } from "react-hook-form";

const QuestionForm = ({
  index,
  control,
}: {
  index: number;
  control: Control<IFormInputs, any>;
}) => {
  const [option1] = useState(generateRandomId(8));
  const [option2] = useState(generateRandomId(8));
  const [option3] = useState(generateRandomId(8));

  return (
    <>
      <FormField
        control={control}
        name={`questions.${index}.question`}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 ">
            <FormLabel className="text-xl font-medium border-none">
              Question
            </FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <h3 className="text-xl font-medium border-none -mb-2">Options</h3>

      <FormField
        control={control}
        name={`questions.${index}.correctOption`}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 ">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                className="flex justify-between"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={option1} id="option-one" />
                  <FormField
                    control={control}
                    name={`questions.${index}.option1`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2 ">
                        <FormControl>
                          <Input type="text" {...field} />
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
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2 ">
                        <FormControl>
                          <Input type="text" {...field} />
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
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2 ">
                        <FormControl>
                          <Input type="text" {...field} />
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
