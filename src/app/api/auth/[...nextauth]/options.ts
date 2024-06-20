import dbConnect from "@/app/lib/dbConnect"
import User from "@/app/models/UserModel"
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                Email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await User.findOne({
                        $or: [
                            { email: credentials.identified },
                            { username: credentials.identified }
                        ]
                    })

                    if (!user) {
                        throw new Error('No user found with this email');
                    }
                    if (!user.isVerified) {
                        throw new Error('Please verify your account before logging in');
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error('Incorrect password');
                    }
                } catch (err: any) {
                    throw new Error(err);
                }

            }
        })
    ],

    callbacks: {

        async jwt({ token, user, }) {
            if (user) {
                token._id = user._id.toString();
                token.username = user.username
                token.isVerified = user.isVerified
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.username = token.username
            }
            return session
        },

    },
    pages: {
        signIn: '/sign-in',
        signOut:'/'
    },
    secret: process.env.NEXTJS_SECRET,
    session: {
        strategy: 'jwt'
    }
}
