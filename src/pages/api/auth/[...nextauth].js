/* eslint-disable import/no-anonymous-default-export */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
// Asdfgh@11

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                },
            },

        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                },
            },

        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_ID,
            clientSecret: process.env.LINKEDIN_SECRET,
            id: "linkedin",
            name: "LinkedIn",
            type: "oauth",
            client: { token_endpoint_auth_method: "client_secret_post" },
            issuer: "https://www.linkedin.com",
            profile: (profile) => ({
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
            }),
            wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
            authorization: {
                params: {
                    scope: 'openid profile email'
                },
            },
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        }),
                    });

                    const user = await res.json();
                    // console.log("User Authorized :", user)

                    if (res.ok && user && user.user.id) {
                        return {
                            id: user.user.id,
                            name: user.user.userName || null,
                            email: user.user.email,
                            picture: user.user.pictureURL || null,
                            accessToken: user.token || null,
                        };
                    } else {
                        throw new Error('User not found');
                    }

                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }

            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
        error: '/auth/error',
        verifyRequest: '/verify-request',
    },
    callbacks: {
        async jwt({ token, user, account }) {


            if (user) {
                // console.log("User :::", user)
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.picture;
                token.accessToken = user.accessToken;
            }

            // console.log('JWT Callback - Token after:', token);

            if (account) {
                console.log("Account : ", account)
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
                token.provider = account.provider
            }

            return token;
        },

        async session({ token, session }) {
            // console.log("Session Callback - Token:", token);

            if (token) {
                console.log("token:", token);
                session.user.id = token.id || null;
                session.user.name = token.name || null;
                session.user.email = token.email || null;
                session.user.picture = token.picture || null;
                session.accessToken = token.accessToken || null;
            } else {
                console.error("Token is undefined in session callback");
            }
            return session;
        },

        async redirect({ baseUrl }) {
            return baseUrl;
        }
    }
};


export default (req, res) => {
    return NextAuth(req, res, authOptions);
};

