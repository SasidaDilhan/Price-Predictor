import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/model/user";


await connectToDatabase();

export default async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validate input
    try {
      if (!name || !email || !password) {
        return NextResponse.json(
          { error: "All fields are required" },
          { status: 400 }
        );
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 409 }
        );
      }

       // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        );
      }

      // Validate password strength
      if (password.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters" },
          { status: 400 }
        );
      }


      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });


      return Response.json(
        {
          message: "User created successfully",
          user: { ...user.toObject(), password: undefined },
        },
        { status: 201 }
      );
    } catch (error: any) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Hash password

//   // Create user
//   const result = await User.insertOne({
//     name,
//     email,
//     password: hashedPassword,
//     emailVerified: null,
//     image: null,
//     role: "user",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   });
//   await result.save();
//   return NextResponse.json(
//     {
//       message: "User created successfully",
//       user: result,
//     },
//     { status: 201 }
//   );
// } catch (error) {
//   console.error("Registration error:", error);
//   return NextResponse.json(
//     { error: "Something went wrong" },
//     { status: 500 }
//   );
// };
