import { defineType } from "sanity";

export const answeredTestType = defineType({
  name: "answeredTest",
  type: "document",
  title: "AnsweredTest",
  fields: [
    { name: "author", type: "reference", to: { type: "user" } },
    {
      name: "answers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question1", type: "string" },
            { name: "question2", type: "string" },
            { name: "question3", type: "string" },
          ],
        },
      ],
    },
  ],
});
