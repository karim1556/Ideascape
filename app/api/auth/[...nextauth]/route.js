import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
        return session;
      } catch (error) {
        console.error('Session Error:', error);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        console.log('Connected to DB');
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          console.log('Creating new user with profile:', profile);
          const username = profile.name.replace(/\s+/g, '').toLowerCase();
          await User.create({
            email: profile.email,
            username: username,
            image: profile.picture, // Ensure this matches the schema field
          });
        } else {
          console.log('User already exists:', userExists);
        }
        return true;
      } catch (error) {
        console.error('SignIn Error:', error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
