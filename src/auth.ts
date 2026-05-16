import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from './lib/mongodb';
import User from './models/User';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        await dbConnect();
        
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) {
          throw new Error('User not found or using OAuth');
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordMatch) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          // Auto-register Google users
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            authProvider: 'google',
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        // When first signed in
        token.id = user.id;
        // If Google user, fetch their ID from DB to ensure it matches
        if (account?.provider === 'google') {
          await dbConnect();
          const dbUser = await User.findOne({ email: user.email });
          if (dbUser) {
            token.id = dbUser._id.toString();
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
});
