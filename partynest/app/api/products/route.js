// /app/api/products/route.js

import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/product";

// POST: Add new product
export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();

    // Basic validation
    if (!body.title || !body.price || !body.imageUrl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const product = await Product.create(body);
    return new Response(JSON.stringify(product), { status: 201 });

  } catch (err) {
    console.error("Product creation error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to add product" }),
      { status: 500 }
    );
  }
}

// GET: Fetch all products
export async function GET() {
  await connectDB();

  try {
    const products = await Product.find().sort({ createdAt: -1 });
    // console.log(products)
    return new Response(JSON.stringify(products), { status: 200 });

  } catch (err) {
    console.error("Fetch products error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}
