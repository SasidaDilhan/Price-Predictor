import dbConnect from "@/lib/mongodb";
import { Product, Tproduct } from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

await dbConnect();

export async function POST(req: NextRequest) {
  try {
    const body: Tproduct = await req.json();
    const { name, price, model, description, stock } = body;

    if (!name || !price || !model || !description || stock === undefined) {
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
      name,
      price,
      model,
      description,
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
