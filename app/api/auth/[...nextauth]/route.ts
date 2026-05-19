import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const teacher = await prisma.teacher.findUnique({
            where: { email: credentials.email }
          });

          if (!teacher || !teacher.password) {
            return null;
          }

          const isValid = await compare(credentials.password, teacher.password);

          if (!isValid) {
            return null;
          }

          // IMPORTANTE: Convertir el ID de número a string
          return {
            id: String(teacher.id),  // Esto convierte el número a string
            email: teacher.email,
            name: teacher.nombre,
          };
        } catch (error) {
          console.error("Error en authorize:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/teacher/auth",
    error: "/teacher/auth",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };