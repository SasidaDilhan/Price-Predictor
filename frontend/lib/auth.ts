import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

interface CustomJWTPayload {
  email: string;
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

const SECRET_KEY = new TextEncoder().encode(process.env.MONGODB_URI);

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const creatJWT = async (email: string, userId: string, role: string) => {
  return await new SignJWT({ email, userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(SECRET_KEY);
};

export const verifyJWT = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const { payload }: { payload: CustomJWTPayload } = await jwtVerify(token, SECRET_KEY)
    return payload
  } catch (error) {
    return null
  }
};

export const getSession = async (): Promise<{email:string; userId:string; role:string} | null> => {
    const payload = await verifyJWT()

    if (payload && typeof payload.email === 'string' && typeof payload.userId === 'string' && typeof payload.role === 'string'){
        return{
            email:payload.email,
            userId:payload.userId,
            role:payload.role
        }
    } 
    return null
}
