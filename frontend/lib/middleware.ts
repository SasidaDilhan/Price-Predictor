import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './jwt';

export function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return { authorized: false, error: 'No token provided' };
  }

  const result = verifyToken(token);

  if (!result.valid) {
    return { authorized: false, error: result.error };
  }

  return { authorized: true, user: result.decoded };
}

export function adminMiddleware(req: NextRequest) {
  const authResult = authMiddleware(req);

  if (!authResult.authorized) {
    return authResult;
  }

  if (authResult.user?.role !== 'admin') {
    return { authorized: false, error: 'Admin access required' };
  }

  return authResult;
}