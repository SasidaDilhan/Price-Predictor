import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET!;

export function generateToken(payload: { userId: string; username: string; role: string }) {
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, secret) as { userId: string; username: string; role: string };
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: 'Invalid or expired token' };
  }
}
