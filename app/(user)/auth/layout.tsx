"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

export default function AdminAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "user") {
      enqueueSnackbar("You are already authenticated", { variant: "success" });
      router.replace("/");
    }
  }, [status, router, session?.user?.role]);

  if (status === "loading")
    return (
      <>
        <title>Loading...</title>
        <div className="hero-height grid place-content-center">
          <span className="dui-loading dui-loading-spinner dui-loading-lg bg-primary"></span>
        </div>
      </>
    );

  if (status === "authenticated" && session?.user?.role === "user") return;

  return <div className="min-h-dvh p-5">{children}</div>;
}
