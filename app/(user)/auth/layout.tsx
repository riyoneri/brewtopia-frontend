"use client";

import AuthLoading from "@/components/auth-loading";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { Suspense, useEffect } from "react";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status, data: session } = useSession();
  const router = useRouter();
  const searchParameters = useSearchParams();

  const redirectUrl = searchParameters.get("redirect");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "user") {
      enqueueSnackbar("You are already authenticated", {
        variant: "success",
        key: "already-authenticated",
      });
      router.replace(redirectUrl ?? "/");
    }
  }, [status, router, session?.user?.role, redirectUrl]);

  if (status === "loading") return <AuthLoading fullHeight={false} />;

  if (status === "authenticated" && session?.user?.role === "user") return;

  return <div className="min-h-dvh p-5">{children}</div>;
}

export default function WrappedAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <AuthLayout>{children}</AuthLayout>
    </Suspense>
  );
}
