import getDBCollectionName from "@/lib/getDBCollectionName";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });

        const { email, password } = credentials;

        const userCollection = await getDBCollectionName("user");

        try {
          const user = await userCollection.findOne({ email: email });
          // console.log(result);

          const isPasswordOK = bcrypt.compare(password, user.password);
          console.log(password);
          console.log(user.password);
          console.log(isPasswordOK);

          if (isPasswordOK) return user;
          return NextResponse.json({ error: "error " });
        } catch (error) {
          return NextResponse.json({ error: error });
        }

        // const user = await res.json();

        // if (res.ok && user) {
        //   return user;
        // }
        // return null;
        // console.log(credentials);
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log(user);
        token.id = user.id;
        token.role = user.role;
        token.photo = user.photo;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.photo = token.photo;
      session.user.role = token.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
