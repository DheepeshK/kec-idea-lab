import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'admin@kec.ac.in' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password.');
        }

        const envAdminEmail = process.env.ADMIN_EMAIL;
        const envAdminHash = process.env.ADMIN_PASSWORD_HASH_B64
          ? Buffer.from(process.env.ADMIN_PASSWORD_HASH_B64, 'base64').toString('utf-8')
          : process.env.ADMIN_PASSWORD_HASH;

        if (
          envAdminEmail &&
          credentials.email.toLowerCase() === envAdminEmail.toLowerCase() &&
          envAdminHash
        ) {
          const isMatch = await bcrypt.compare(credentials.password, envAdminHash);
          if (isMatch) {
            return {
              id: 'env-admin',
              email: envAdminEmail,
              name: 'System Admin',
              role: 'superadmin',
            };
          }
        }

        throw new Error('Invalid email or password.');
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
