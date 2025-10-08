// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import bcrypt from "bcryptjs";
// import User from "@/model/user";
// import connectToDatabase from "@/lib/mongodb";
// import { setCookie } from "cookies-next";

import connectToDatabase from "@/lib/mongodb";
import User from "@/model/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid credentials");
//         }

//         await connectToDatabase();
//         const user = await User.findOne({ email: credentials.email });

//         if (!user || !user.password) {
//           throw new Error("Invalid credentials");
//         }

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isValid) {
//           throw new Error("Invalid credentials");
//         }

//         return { id: user._id.toString(), email: user.email, role: user.role };
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),

//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],

//   pages: {
//     signIn: "/auth/signin",
//     error: "/auth/error",
//   },

//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.id = user.id;
//       if (user) token.role = (user as any).role;
//       return token;
//     },
//     async session({ session, token }) {
//       ((session.user as any).id = token.id),
//         ((session.user as any).role = token.role);
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

const secret = process.env.JWT_SECRET;

export default async function handler(req: NextRequest) {
  if (req.method === "POST") {
    await connectToDatabase();

    const { email, password } = await req.json();

    try {
      //check if user already exist
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ error: "User Not Found" }, { status: 404 });
      }

      //compare
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Invalid Password" },
          { status: 401 }
        );
      }
      //generate a JWT Token
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
        },
        secret!, // ✅ Safe and type-checked
        { expiresIn: "1h" } // Optional expiration time
      );

      // Create response
      const response = NextResponse.json(
        {
          success: true,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        },
        { status: 200 }
      );

      // ✅ Set token as HTTP-only cookie
      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true, // Prevents JavaScript access (XSS protection)
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "strict", // CSRF protection
        maxAge: 60 * 60, // 1 hour (in seconds)
        path: "/", // Cookie available across entire site
      });

      return response;
    } catch (error) {
      console.error("Login error:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }else{
     return NextResponse.json(
        { error: "Methos not allowed" },
        { status: 405 }
      );
  }
}
