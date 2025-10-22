import dbConnect from "@/lib/mongodb";
import { Product, Tproduct } from "@/models/product";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

await dbConnect();

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Only logged-in sellers can add products
    if (!token || token.role !== "seller") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body: Tproduct = await req.json();
    const { name, price, model, description, stock, images } = body;

    if (
      !name ||
      !price ||
      !model ||
      !description ||
      !stock ||
      !images === undefined
    ) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const existinProduct = await Product.findOne({ name });
    if (existinProduct) {
      return NextResponse.json(
        {
          message: "Product already exists",
        },
        { status: 400 }
      );
    }
    await Product.create({
      sellerId: token.id,
      name,
      price,
      model,
      description,
      images,
      stock,
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in /api/product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token || token.role !== "seller") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const products = await Product.find({ sellerId: token.id });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching seller products:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}