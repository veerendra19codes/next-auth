import  CredentialsProvider  from "next-auth/providers/credentials"
import NextAuth from "next-auth/next"
import { connectToDB } from "@/lib/connectToDB";
import bcrypt from "bcrypt";
import models from "@/lib/models";
const User = models.User;

export const authOptions = {

    pages: {
        signIn: "/login",
    },

    session: {
        strategy: 'jwt',
    },

    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {

                if(!credentials.email || !credentials.password) {
                    return null;
                }

                try {
        connectToDB();

        const user = await User.findOne({email:credentials.email});

        // console.log("user found", user);

        if(!user) {
            // throw new Error("Wrong Email or User with this Email does not exist");
            return null;
        }
        else {
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

            if(!isPasswordCorrect) {
                // throw new Error("Incorrect Passsword");
                return null;
            }
            else {
                return {
                    id:user.id,
                    email:user.email,
                    username: user.username,
                };
            }
        }
    }
    catch(err) {
        console.log("Error while loggin in route.js", err);
        throw new Error("Error while logging in catch");
    }


            }
        })
    ],

    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {

        async session({ session, token }) {
            // console.log('session token', token)
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                    email: token.email,
                }
            }
        },

        async jwt({ token, user }) {

            // after login jwt token and get the user data from here
            // console.log("user info", user);
            // console.log("jwt token", token);
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    username: user.username,
                    email: user.email,
                }
            }
            return token
        }
    },

};

// export default NextAuth(authOptions)
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};

