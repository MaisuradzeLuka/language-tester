import * as z from "zod";

const questionSchema = z.object({
  question: z.string().min(3),
  option1: z.string().min(1),
  option2: z.string().min(1),
  option3: z.string().min(1),
  correctOption: z.string().min(1),
});

export const questionsSchema = z.object({
  title: z.string().min(3),
  questions: z.array(questionSchema),
});

export const userSchema = z.object({
  name: z.string().min(3),
  lastname: z.string().min(3),
});
