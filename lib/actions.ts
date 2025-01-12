"use server";

import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { TEST_BY_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/writeClient";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

export const createOrReplaceQuestion = async (formData: any) => {
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
      _id: `question.${slug}`, // Ensure consistent document ID for replace functionality
      _type: "question",
      author: { _type: "reference", _ref: session.id },
      title: formData.title,
      questions: questionsWithKeys,
      slug: { _type: "slug", current: slug },
    };

    await writeClient
      .withConfig({ useCdn: false })
      .createOrReplace(questionType); // Replaced `create` with `createOrReplace`

    return {
      status: "Success",
      message: "Question uploaded or replaced successfully",
    };
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

export const deleteTest = async (id: string) => {
  try {
    console.log(id);

    client.delete(id);
  } catch (error: any) {
    throw new Error("Something went wrong: " + error.message);
  }
};

export const fetchTest = async (id: string) => {
  const test = await client.fetch(TEST_BY_ID_QUERY, { id });

  return test;
};
