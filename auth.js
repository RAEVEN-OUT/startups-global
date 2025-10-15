import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GIT_ID,
      clientSecret: process.env.GIT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user: { name, email, image }, profile: { id, login, bio } }) {
      // ✅ FIXED: pass { id } as an object
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id })

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          _id: id,
          id, // include for convenience
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        })
      }
      return true
    },

    async jwt({ token, account, profile }) {
      let userId = token.id

      if (account && profile) {
        // ✅ FIXED: pass as object again
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id })

        if (user?._id) userId = user._id
      }

      token.id = userId
      return token
    },

    async session({ session, token }) {
      Object.assign(session, { id: token?.id ?? null })
      return session
    },
  },
  secret: process.env.AUTH_SECRET,
})
