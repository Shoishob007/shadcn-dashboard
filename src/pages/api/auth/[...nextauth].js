/* eslint-disable import/no-anonymous-default-export */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
// Asdfgh@11
// qononifi@cyclelove.cc

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: [
                        "https://www.googleapis.com/auth/userinfo.email",
                        "https://www.googleapis.com/auth/userinfo.profile",
                        "https://www.googleapis.com/auth/calendar.readonly",
                        "https://www.googleapis.com/auth/calendar.events"
                    ].join(" "),
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }

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
                    console.log("User Authorized :", user)

                    if (res.ok && user) {

                        const orgResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${user.token}`,
                                'Content-Type': 'application/json',
                            },
                        });

                        if (orgResponse.ok) {
                            const orgData = await orgResponse.json();
                            const organizationId = orgData.docs[0]?.id;
                            console.log("Organization ID:", organizationId);

                            return {
                                id: user.user.id,
                                name: orgData.docs[0]?.orgName || null,
                                tagline: orgData.docs[0]?.orgTagline || null,
                                mission: orgData.docs[0]?.orgMission || null,
                                vision: orgData.docs[0]?.orgVision || null,
                                address: orgData.docs[0]?.orgAddress || null,
                                email: orgData.docs[0]?.orgEmail,
                                picture: user.user.pictureURL || null,
                                accessToken: user.token,
                                organizationId,
                            };
                        } else {
                            console.error("Failed to fetch organization data:", orgResponse.statusText);
                        }
                        return null;
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
                // console.log("Call back user :::", user)
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.picture;
                token.access_token = user.accessToken;
                token.organizationId = user.organizationId;
                // console.log("AccessToken added to user:", token.access_token);
                // console.log("JWT Callback - Token after modification:", token);
            }

            // console.log('JWT Callback - Token after:', token);

            if (account) {
                // console.log("Account : ", account)
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
                token.provider = account.provider
            }

            return token;
        },

        async session({ token, session }) {
            // console.log("Token passed to session callback:", token);

            if (token) {
                console.log("session:", session);
                session.user.id = token.id || null;
                session.user.name = token.name || null;
                session.user.email = token.email || null;
                session.user.picture = token.picture || null;
                session.access_token = token.access_token || null;
                session.organizationId = token.organizationId || null;
                // console.log("Session Access Token after modification:", session.access_token);

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

