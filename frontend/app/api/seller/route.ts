// app/api/seller/route.ts
import dbConnect from "@/lib/mongodb";
import Seller from "@/models/seller";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

await dbConnect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      password,
      sellerName,
      businessName,
      businessAddress,
      businessLogo,
    } = body;

    // Validate required fields
    if (
      !email ||
      !password ||
      !sellerName ||
      !businessName ||
      !businessAddress ||
      !businessLogo
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if seller with the same email exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return NextResponse.json(
        { message: "Seller with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new seller
    const newSeller = await Seller.create({
      email,
      password: hashedPassword, // Ideally hash password before saving (e.g., bcrypt)
      sellerName,
      businessName,
      businessAddress,
      businessLogo,
      role: "seller",
    });

    return NextResponse.json(
      { message: "Seller created successfully", seller: newSeller },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating seller:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Seller ID is required" },
        { status: 400 }
      );
    }

    const seller = await Seller.findById(id).select("-password");

    if (!seller) {
      return NextResponse.json(
        { message: "Seller not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ seller }, { status: 200 });
  } catch (error) {
    console.error("Error fetching seller:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
