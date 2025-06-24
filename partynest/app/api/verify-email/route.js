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

    if (!user) {
      return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify-failed`);
    }
    
    user.isVerified = true;
    await user.save();

    return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify-success`, 302);
  } catch (err) {
    return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify-failed`, 302);
  }
}
