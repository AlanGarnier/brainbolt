import { User } from '@/lib/types';
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: User;
    accessToken: string;
  }

  interface User {
    id: string;
    email: string;
    pseudo: string;
    picture: string;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    pseudo: string;
    picture: string;
    accessToken: string;
  }
}
