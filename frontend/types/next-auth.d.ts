import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'admin' | 'user' | 'seller';
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: 'admin' | 'user' | 'seller';
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: 'admin' | 'user' | 'seller';
    id: string;
  }
}