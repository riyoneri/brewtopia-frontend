"use client";

import AuthLoading from "@/components/auth-loading";
import DeactivatedAccount from "@/components/deactivated-account";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (session && session.user.role !== "user")
    ) {
      enqueueSnackbar("Login first", { variant: "error", key: "login" });

      router.replace("/auth/login");
    }
  }, [status, router, session]);

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
