import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      id: "google-admin",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/google`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          },
        );

        if (!response.ok) return false;

        return true;
      } catch {
        return "/obsidian/auth/login";
      }
    },
  },
});

export { handler as GET, handler as POST };
