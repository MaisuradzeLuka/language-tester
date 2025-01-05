import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const userType = defineType({
  name: "user",
  type: "document",
  title: "User",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "string",
    }),
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "string",
    }),
    defineField({
      name: "role",
      type: "string",
    }),
  ],
});
