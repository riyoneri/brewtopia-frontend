"use client";

import AuthLoading from "@/components/auth-loading";
import DeactivatedAccount from "@/components/deactivated-account";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status, data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (session && session.user.role !== "user")
    ) {
      enqueueSnackbar("Login first", { variant: "error", key: "login" });

      router.replace(`/auth/login?redirect=${pathname}`);
    }
  }, [pathname, router, session, status]);

  // useEffect(() => {
  //   if (!session) return;
  //   let socket;
  //   socket = connectSocketServer(session?.user.token, session?.user.role);

  //   socket.on("client:status", (data) => {
  //     update({ active: data.active });
  //   });
  // }, [session, update]);

  if (status === "loading") return <AuthLoading fullHeight={false} />;

  if (
    status === "unauthenticated" ||
    (session && session.user.role !== "user")
  ) {
    signOut({ redirect: false });
    return;
  }

  if (!session?.user.active) return <DeactivatedAccount />;

  return <div>{children}</div>;
}
