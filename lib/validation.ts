import * as z from "zod";

const optionsSchema = z.object({
  name: z.string(),
  value: z.string().nonempty({ message: "Option 1 value is required." }),
  id: z.string(),
});

const questionSchema = z.object({
  question: z
    .string()
    .min(3, { message: "Question must be at least 3 characters long." }),
  option1: optionsSchema,
  option2: optionsSchema,
  option3: optionsSchema,
  correctOption: z
    .string()
    .min(1, { message: "A correct option must be selected." }),
  type: z.string(),
});

const textQuestionSchema = z.object({
  question: z
    .string()
    .min(3, { message: "Question must be at least 3 characters long." }),
  text: z
    .string()
    .min(3, { message: "Text must be at least 3 characters long." }),
  options: z.array(optionsSchema).length(3),
  correctOption: z
    .string()
    .min(1, { message: "A correct option must be selected." }),
  type: z.string(),
});

export const questionsSchema = z.object({
  title: z.string().min(3),
  questions: z.array(z.union([questionSchema, textQuestionSchema])),
});

export const userSchema = z.object({
  name: z.string().min(3),
  lastname: z.string().min(3),
});
