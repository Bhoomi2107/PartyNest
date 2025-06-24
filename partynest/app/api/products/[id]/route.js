// /app/api/products/[id]/route.js

import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/utils/db";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
