import jwt from 'jsonwebtoken';

export async function GET(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Proceed with authenticated logic
    return new Response(JSON.stringify({ message: "Protected data" }));
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 403 });
  }
}
