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
            { name: "question", type: "string", title: "Question" },
            {
              name: "options",
              type: "array",
              of: [
                {
                  name: "option",
                  type: "object",
                  fields: [
                    { name: "name", type: "string" },
                    { name: "value", type: "string" },
                    { name: "customId", type: "string" },
                  ],
                },
              ],
            },
            { name: "type", type: "string" },
            { name: "correctOption", type: "string" },
            { name: "text", type: "string" },
          ],
        },
      ],
    },
  ],
});
