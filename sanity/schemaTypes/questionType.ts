import { defineType } from "sanity";

export const questionType = defineType({
  name: "question",
  type: "document",
  title: "Question",
  fields: [
    {
      name: "author",
      type: "reference",
      to: { type: "user" },
    },

    {
      name: "title",
      type: "string",
    },

    {
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    },

    {
      name: "questions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string" },
            { name: "option1", type: "string" },
            { name: "option2", type: "string" },
            { name: "option3", type: "string" },
            { name: "correctOption", type: "string" },
          ],
        },
      ],
    },
  ],
});
