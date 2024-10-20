"use client";

import AuthLoading from "@/components/auth-loading";
import DeactivatedAccount from "@/components/deactivated-account";
import { getSocket } from "@/helpers/socket";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status, data: session } = useSession();
  const router = useRouter();
  const socket = getSocket();
  const [userActive, setUserActive] = useState(true);

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (session && session.user.role !== "user")
    ) {
      enqueueSnackbar("Login first", { variant: "error", key: "login" });

      router.replace("/auth/login");
    }
  }, [status, router, session]);

  useEffect(() => {
    if (!socket) return;

    socket.on("client:status", (data) => {
      setUserActive(data.active);
    });
  }, [socket]);

  if (status === "loading") return <AuthLoading fullHeight={false} />;

  if (
    status === "unauthenticated" ||
    (session && session.user.role !== "user")
  ) {
    signOut({ redirect: false });
    return;
  }

  if (!session?.user.active || !userActive) return <DeactivatedAccount />;

  return <div>{children}</div>;
}
