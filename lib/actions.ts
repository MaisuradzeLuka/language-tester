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
      questions: questionsWithKeys,
      slug: { _type: slug, current: slug },
    };

    await writeClient
      .withConfig({ useCdn: false })
      .create({ _type: "question", ...questionType });

    return { status: "Success", errMsg: "Question uploaded successfully" };
  } catch (error: any) {
    return { status: "Error", errMsg: error.message };
  }
};
