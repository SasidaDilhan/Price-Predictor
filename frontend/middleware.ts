import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.JWT_SECRET;

export function verifyToken(token: string) {
  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, secret!);
    return { valid: true, decoded };
  } catch (error) {
    // Handle different JWT errors
    console.error("Token verification failed:", error);
    return { valid: false, error: error instanceof Error ? error.message : "Invalid token" };
  }
}

export default async function handler(req: NextRequest) {
  // Get token from cookie
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "No token provided" },
      { status: 401 }
    );
  }

  // Verify token
  const result = verifyToken(token);

  if (!result.valid) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }

  // Access decoded data
  const { userId, username } = result.decoded as any;

  // Continue with your protected logic
  return NextResponse.json({
    message: "Protected data",
    user: { userId, username }
  });
}