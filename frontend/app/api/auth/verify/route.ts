import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/middleware';

export async function GET(req: NextRequest) {
  const authResult = authMiddleware(req);

  if (!authResult.authorized) {
    return NextResponse.json(
      { error: authResult.error },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: authResult.user,
  });
}