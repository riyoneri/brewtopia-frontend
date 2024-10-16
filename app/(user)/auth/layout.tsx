"use client";

import AuthLoading from "@/components/auth-loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "user") {
      enqueueSnackbar("You are already authenticated", {
        variant: "success",
        key: "already-authenticated",
      });
      router.replace("/");
    }
  }, [status, router, session?.user?.role]);

  if (status === "loading") return <AuthLoading fullHeight={false} />;

  if (status === "authenticated" && session?.user?.role === "user") return;

  return <div className="min-h-dvh p-5">{children}</div>;
}
