"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/writeClient";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

export const createQuestion = async (formData: any) => {
  const session = await auth();

  if (!session) redirect("/api/auth/signin");

  try {
    const slug = slugify(formData.questions[0].question as string, {
      lower: true,
      strict: true,
    });

    const questionsWithKeys = formData.questions.map((question: any) => ({
      ...question,
      _key: uuidv4(),
    }));

    const questionType = {
      author: { _type: "reference", _ref: session.id },
      title: formData.title,
      questions: questionsWithKeys,
      slug: { _type: slug, current: slug },
    };

    await writeClient
      .withConfig({ useCdn: false })
      .create({ _type: "question", ...questionType });

    return { status: "Success", message: "Question uploaded successfully" };
  } catch (error: any) {
    return { status: "Error", message: error.message };
  }
};

export const answereTest = async (
  data: { name: string; value: string }[],
  id: string
) => {
  const session = await auth();

  if (!session) redirect("/api/auth/signin");

  try {
    const answeredTestWithKeys = data.map((question: any) => ({
      ...question,
      _key: uuidv4(),
    }));

    const answeredTestType = {
      author: { _type: "reference", _ref: session.id },
      id,
      answers: answeredTestWithKeys,
    };

    await writeClient
      .withConfig({ useCdn: false })
      .create({ _type: "answeredTest", ...answeredTestType });

    return { status: "Success", message: "Question uploaded successfully" };
  } catch (error: any) {
    return { status: "Error", message: error.message };
  }
};
