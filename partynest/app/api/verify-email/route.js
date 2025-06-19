import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();

  const token = new URL(req.url).searchParams.get("token");

  if (!token) {
    return new Response("Invalid or missing token", { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) return new Response("User not found", { status: 404 });

    user.isVerified = true;
    await user.save();

    return new Response("Email verified successfully!");
  } catch (err) {
    return new Response("Token expired or invalid", { status: 400 });
  }
}
