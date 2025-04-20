import { NuxtAuthHandler } from "#auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";

export default NuxtAuthHandler({
  adapter: DrizzleAdapter(useDrizzle()),
  secret: process.env.AUTH_SECRET || "your-secret-here",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await useDrizzle()
          .select()
          .from(tables.users)
          .where(eq(tables.users.email, credentials.email as string))
          .get();

        if (!user || !user.password) {
          return null;
        }

        if (credentials.password !== user.password) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }) as any,
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    /* on redirect to another url */
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    /* on session retrival */
    async session({ session, user }) {
      return session;
    },
    /* on JWT token creation or mutation */
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  events: {
    async signIn(message) {
      console.log("sign in");
    },
    async signOut(message) {
      console.log("sign out");
    },
    async createUser(message) {
      console.log("create user");
    },
    async updateUser(message) {
      console.log("update user");
    },
    async linkAccount(message) {
      /* account (e.g. GitHub) linked to a user */
    },
    async session(message) {
      // console.log('session', message);
    },
  },
  pages: {
    signIn: "/login",
  },
});
