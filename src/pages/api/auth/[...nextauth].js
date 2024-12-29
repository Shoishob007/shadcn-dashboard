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

                        if (user.user.role == "org") {
                            const orgResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations`, {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${user.token}`,
                                    'Content-Type': 'application/json',
                                },
                            });

                            if (orgResponse.ok) {
                                const orgData = await orgResponse.json();
                                const organization = orgData.docs.find(
                                    (doc) => doc.organization.id === user.user.id
                                );
                                const organizationId = organization?.id;
                                // console.log("Organization ID:", organizationId);
                                // console.log("Organization :", orgData.docs[0]);


                                return {
                                    id: user.user.id,
                                    email: user.user.email || null,
                                    name: organization.orgName || null,
                                    // tagline: orgData.docs[0]?.orgTagline || null,
                                    // mission: orgData.docs[0]?.orgMission || null,
                                    // vision: orgData.docs[0]?.orgVision || null,
                                    // address: orgData.docs[0]?.orgAddress || null,
                                    image: user.user.pictureUrl || null,
                                    accessToken: user.token,
                                    organizationId,
                                };
                            }
                        }

                        else if (user.user.role == "applicant") {
                            {
                                const applicantResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applicants`, {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': `Bearer ${user.token}`,
                                        'Content-Type': 'application/json',
                                    },
                                });

                                if (orgResponse.ok) {
                                    const applicantData = await applicantResponse.json();
                                    // console.log("Organization ID:", organizationId);
                                    // console.log("Organization :", orgData.docs[0]);
                                    const applicant = orgData.docs.find(
                                        (doc) => doc.applicant.id === user.user.id
                                    );


                                    return {
                                        id: user.user.id,
                                        email: user.user.email || null,
                                        name: applicant?.name || null,
                                        // tagline: applicantData.docs[0]?.orgTagline || null,
                                        // mission: applicantData.docs[0]?.orgMission || null,
                                        // vision: applicantData.docs[0]?.orgVision || null,
                                        // address: applicantData.docs[0]?.orgAddress || null,
                                        image: user.user.pictureUrl || null,
                                        accessToken: user.token,
                                    };
                                }
                            }
                        }

                        else {
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
        async jwt({ token, user, account, trigger, session }) {
            if (trigger === "update" && session?.user?.image) {
                token.image = session.user.image;
            }

            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.image = user.image;
                token.access_token = user.accessToken;
                token.organizationId = user.organizationId;
            }

            if (account) {
                // console.log("Account info: ", account)
                // token.access_token = account.access_token;
                token.provider = account.provider;
            }

            return token;
    },

    async session({ session, token, trigger }) {
      if (trigger === "update" && token?.image) {
        session.user.image = token.image;
      }

      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.image;
        session.access_token = token.access_token;
        session.organizationId = token.organizationId;

        console.log("Current Server Session :", session);
      }
      return session;
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
    verifyRequest: "/verify-request",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default (req, res) => NextAuth(req, res, authOptions);
