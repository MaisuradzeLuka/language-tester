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
              name: "option1",
              type: "object",
              title: "Option 1",
              fields: [
                { name: "name", type: "string", title: "Name" },
                { name: "value", type: "string", title: "Value" },
                { name: "id", type: "string", title: "Id" },
              ],
            },
            {
              name: "option2",
              type: "object",
              title: "Option 2",
              fields: [
                { name: "name", type: "string", title: "Name" },
                { name: "value", type: "string", title: "Value" },
                { name: "id", type: "string", title: "Id" },
              ],
            },
            {
              name: "option3",
              type: "object",
              title: "Option 3",
              fields: [
                { name: "name", type: "string", title: "Name" },
                { name: "value", type: "string", title: "Value" },
                { name: "id", type: "string", title: "Id" },
              ],
            },
            {
              name: "correctOption",
              type: "string",
              title: "Correct Option",
              description: "The value of the correct option",
            },
          ],
        },
      ],
    },
  ],
});
