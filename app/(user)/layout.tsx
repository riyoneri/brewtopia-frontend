"use client";

import Footer from "@/components/footer";
import UserNavBar from "@/components/user/user-navbar";
import { connectSocketServer } from "@/helpers/socket";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) connectSocketServer(session?.user.token, session?.user.role);
  }, [session]);

  return (
    <main>
      <UserNavBar />
      <div className="dynamic-hero-height">{children}</div>
      <Footer />
    </main>
  );
}
