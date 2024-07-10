import { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const res = await fetch(`http://127.0.0.1:5001/api/login`, {
          method: 'POST',
          body: JSON.stringify(
            {
              email: credentials?.email,
              password: credentials?.password
            }
          ),
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();

        if (res.ok && data.user) {
          return {
            id: data.user.id,
            email: data.user.email,
            pseudo: data.user.pseudo,
            picture: data.user.picture,
            token: data.access_token
          } as User;
        } else {
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.pseudo = user.pseudo;
        token.picture = user.picture;
        token.accessToken = user.token; // Store the token in the JWT
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        pseudo: token.pseudo,
        picture: token.picture,
        token: token.accessToken,
      } as User;
      session.accessToken = token.accessToken; // Include the token in the session
      return session;
    }
  }
};

export default authOptions;
