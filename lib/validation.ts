import * as z from "zod";

const optionsSchema = z.object({
  name: z.string(),
  value: z.string().nonempty({ message: "Option 1 value is required." }),
  customId: z.string(),
});

const questionSchema = z.object({
  type: z.literal("select"),
  question: z
    .string()
    .min(3, { message: "Question must be at least 3 characters long." }),
  options: z.array(optionsSchema).length(3),
  correctOption: z
    .string()
    .min(1, { message: "A correct option must be selected." }),
});

const textQuestionSchema = z.object({
  type: z.literal("text"),
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
});

export const questionsSchema = z.object({
  title: z.string().min(3),
  questions: z.array(z.union([questionSchema, textQuestionSchema])),
});

export const userSchema = z.object({
  name: z.string().min(3),
  lastname: z.string().min(3),
});
