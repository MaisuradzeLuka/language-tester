import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import { USER_BY_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/writeClient";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ profile }) {
      const { sub: id, name, email, image } = profile;

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(USER_BY_ID_QUERY, { id });

      if (!existingUser) {
        await writeClient.create({
          _type: "user",
          _id: id,
          id,
          name,
          email,
          image,
        });
      }

      return true;
    },
  },
});
