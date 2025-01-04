import * as z from "zod";

const questionSchema = z.object({
  question: z
    .string()
    .min(3, { message: "Question must be at least 3 characters long." }),
  option1: z.object({
    name: z.string(),
    value: z.string().nonempty({ message: "Option 1 value is required." }),
    id: z.string(),
  }),
  option2: z.object({
    name: z.string(),
    value: z.string().nonempty({ message: "Option 2 value is required." }),
    id: z.string(),
  }),
  option3: z.object({
    name: z.string(),
    value: z.string().nonempty({ message: "Option 3 value is required." }),
    id: z.string(),
  }),
  correctOption: z
    .string()
    .min(1, { message: "A correct option must be selected." }),
});

export const questionsSchema = z.object({
  title: z.string().min(3),
  questions: z.array(questionSchema),
});

export const userSchema = z.object({
  name: z.string().min(3),
  lastname: z.string().min(3),
});
