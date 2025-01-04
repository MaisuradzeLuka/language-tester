import { defineType } from "sanity";

export const answeredTestType = defineType({
  name: "answeredTest",
  type: "document",
  title: "AnsweredTest",
  fields: [
    { name: "author", type: "reference", to: { type: "user" } },
    { name: "id", type: "string" },
    {
      name: "answers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string" },
            { name: "value", type: "string" },
          ],
        },
      ],
    },
  ],
});
