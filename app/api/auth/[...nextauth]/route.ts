import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 3600,
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      id: "google-admin",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return { ...profile, id: profile.sub, role: "admin" };
      },
    }),
    GoogleProvider({
      id: "google-client",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return { ...profile, id: profile.sub, role: "user" };
      },
    }),
    CredentialsProvider({
      id: "admin-credentials",
      name: "admin-credentials",
      credentials: {
        email: { type: "string" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${apiUrl}/admin/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXTAUTH_CALLBACK_TOKEN}`,
            },
          });

          const data = await response.json();

          if (!response.ok) throw new Error(data.message);

          return {
            id: data.user.id,
            email: data.user.email,
            image: data.user.image,
            name: data.user.name,
            role: "admin",
            token: data.token,
          };
        } catch (error) {
          const typedError = error as { message: string; status: number };

          throw new Error(typedError.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider.includes("google")) {
        let requestUrl = `${apiUrl}/admin/auth/google`;
        if (account?.provider === "google-client")
          requestUrl = `${apiUrl}/auth/google`;

        try {
          const response = await fetch(requestUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXTAUTH_CALLBACK_TOKEN}`,
            },
            body: JSON.stringify(user),
          });

          if (!response.ok) return false;

          const data = await response.json();

          user.token = data.token;

          return true;
        } catch {
          if (account?.provider.includes("google")) {
            return account?.provider === "google-client"
              ? "/auth/login"
              : "/obsidian/auth/login";
          }

          return false;
        }
      }

      return true;
    },
    jwt({ user, token }) {
      user?.role && (token.role = user.role);
      user?.picture && (token.image = user.picture);
      user?.token && (token.token = user.token);

      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.image = token.image;
      session.user.token = token.token;

      return session;
    },
  },
  pages: {
    error: "/authentication-error",
  },
});

export { handler as GET, handler as POST };
