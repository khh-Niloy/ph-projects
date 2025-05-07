import getDBCollection from "@/lib/getDBCollection";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userEmail: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { userEmail, password } = credentials;
        const userCollection = await getDBCollection("user");
        try {
          const user = await userCollection.findOne({
            userEmail: userEmail,
          });
          const isPasswordOK = await bcrypt.compare(password, user.password);
          console.log(isPasswordOK);

          if (!isPasswordOK) {
            return null;
          }

          return user;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id.toString();
        token.role = user.role;
        token.image = user.image;
        token.userEmail = user.userEmail;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.image = token.image;
        session.user.role = token.role;
        session.user.userEmail = token.userEmail;
      }
      console.log("Session:", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
