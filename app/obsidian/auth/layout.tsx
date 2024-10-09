"use client";

import AuthLoading from "@/components/auth-loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

export default function AdminAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      enqueueSnackbar("You are already authenticated", { variant: "success" });
      router.replace("/obsidian");
    }
  }, [status, router]);

  if (status === "loading") return <AuthLoading />;

  if (status === "authenticated") return;

  return <div className="min-h-dvh p-5">{children}</div>;
}
