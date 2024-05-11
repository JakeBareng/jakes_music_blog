import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoClient } from "mongodb"
import { MongoDBAdapter } from "@auth/mongodb-adapter"

const mongoUri = process.env.MONGODB_URI || '';
const client = new MongoClient(mongoUri);

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  // Add MongoDB adapter
  adapter: MongoDBAdapter(client as any),
  callbacks: {
    session({ session, token , user}:any) {
      const adminEmail = process.env.ADMIN_EMAIL;
      session.user.isAdmin = user.email === adminEmail;
      return session;
    }
  }
}

export default NextAuth(authOptions as any)