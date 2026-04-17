import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { comparePasswords } from "@/lib/auth-utils";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login", 
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !(await comparePasswords(credentials.password as string, user.password))) {
          return null;
        }

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id; // Add the database ID to the token
      token.role = (user as any).role;
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user) {
      (session.user as any).id = token.id; // Pass ID from token to session
      (session.user as any).role = token.role;
    }
    return session;
  },
},
});