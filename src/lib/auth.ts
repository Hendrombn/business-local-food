import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Nanti diganti dengan query Prisma
        // Sementara mock dulu
        if (
          credentials.email === 'admin@kulinerlokal.com' &&
          credentials.password === 'password123'
        ) {
          return {
            id: '1',
            name: 'Budi Santoso',
            email: 'admin@kulinerlokal.com',
            role: 'OWNER',
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role: string }).role;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? '';
        (session.user as { role: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
