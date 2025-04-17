import { NuxtAuthHandler } from '#auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import CredentialsProvider from '@auth/core/providers/credentials';
import { eq } from 'drizzle-orm';

const db = useDrizzle();

export default NuxtAuthHandler({
  adapter: DrizzleAdapter(db) as any,
  secret: process.env.AUTH_SECRET || 'your-secret-here',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    // @ts-expect-error - Type mismatch between @auth/core and next-auth
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const [user] = await db
          .select()
          .from(tables.users)
          .where(eq(tables.users.email, credentials.email as string))
          .limit(1);

        if (!user || !user.password) {
          throw new Error('No user found');
        }

        // In a real app, you should use proper password hashing like bcrypt
        if (credentials.password !== user.password) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
});
