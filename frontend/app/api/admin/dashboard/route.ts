import { NextRequest, NextResponse } from 'next/server';
import { adminMiddleware } from '@/lib/middleware';

export async function GET(req: NextRequest) {
  const authResult = adminMiddleware(req);

  if (!authResult.authorized) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.user ? 403 : 401 }
    );
  }

  // Return admin dashboard data
  return NextResponse.json({
    success: true,
    message: 'Welcome to Admin Dashboard',
    admin: authResult.user,
    dashboardData: {
      totalUsers: 150,
      activeUsers: 120,
      revenue: 50000,
    },
  });
}