import getDBCollection from "@/lib/getDBCollection";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userEmail: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { userEmail, password } = credentials;
        console.log(credentials);

        const userCollection = await getDBCollection("user");
        try {
          const user = await userCollection.findOne({
            userEmail: userEmail,
          });
          console.log("user1", user);
          const isPasswordOK = await bcrypt.compare(password, user.password);
          console.log(isPasswordOK);

          if (!isPasswordOK) {
            return null;
          }
          console.log("user2", user);

          return user;
        } catch (error) {
          return NextResponse.json({ error: error });
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log(user);
        token.id = user.id;
        token.role = user.role;
        token.image = user.image;
        token.userEmail = user.userEmail;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.image = token.image;
      session.user.role = token.role;
      session.user.userEmail = token.userEmail;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
