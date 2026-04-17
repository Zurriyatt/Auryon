// [...nextauth]/route.js
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import { SessionContext } from "next-auth/react";

// ✅ Export options separately
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      await connectDB();
      const existing = await User.findOne({ email: user.email });
      if (!existing) {
        await User.create({
          email: user.email,
          userName:"@" +(user.name.toLowerCase()) + "_12",
          uid: crypto.randomUUID(),
        });
      }
      return true;
    },
    async session({ session }) {
      const dbUser = await User.findOne({ email: session.user.email });
      
      if(dbUser.userName){
        session.user.name = `${dbUser.userName}`
      }
      else{session.user.uid = dbUser.uid;
        session.user.name = `@${session.user.name.toLowerCase()}_12`
      }

      console.log(session.user.uid)
      return session;
    },
  },
};

// ✅ Handler for the Next.js route
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };    