import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import { USER_BY_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/writeClient";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ profile }) {
      const { sub: id, name, email, picture } = profile;

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
          image: picture,
          role: "USER",
        });
      }

      return true;
    },

    async jwt({ token, profile, account }) {
      if (profile && account) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(USER_BY_ID_QUERY, { id: profile.sub });

        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id, role: token.role });
      return session;
    },
  },
});
