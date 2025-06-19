import { connectDB } from '@/lib/db';
import { User } from '@/lib/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { name, email, password } = await req.json();

  await connectDB();
  if (!password || password.length < 8) {
    return new Response(JSON.stringify({ error: 'Password must be at least 8 characters long' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
}