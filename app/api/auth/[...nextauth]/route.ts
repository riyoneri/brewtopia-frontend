import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
  ],
  callbacks: {
    async signIn({ user, account }) {
      let requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/google`;
      if (account?.provider === "google-client")
        requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;

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

        return true;
      } catch {
        if (account?.provider.includes("google")) {
          return account?.provider === "google-client"
            ? "/auth/login"
            : "/obsidian/auth/login";
        }

        return false;
      }
    },
    jwt({ user, token }) {
      user?.role && (token.role = user.role);

      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;

      return session;
    },
  },

  pages: {
    error: "/authentication-error",
  },
});

export { handler as GET, handler as POST };
