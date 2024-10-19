"use client";

import DeactivatedIllustration from "@/assets/illustrations/deactivated.illustration";
import AuthLoading from "@/components/auth-loading";
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

  if (!session?.user.active)
    return (
      <div className="hero-height grid place-content-center gap-2 px-5 text-center">
        <DeactivatedIllustration className="mx-auto w-2/3 sm:w-1/2" />
        <p className="py-5 text-xl font-medium">Hey Lionel Kaneza,</p>
        <p>
          We hope you&apos;re well. Your Brewtopia account is currently
          deactivated.
        </p>

        <p>
          If this is an error or you need help, we&apos;re here for you. Reach
          out anytime! Cheers,
        </p>
        <p className="font-medium">The Brewtopia Team</p>
      </div>
    );

  return <div>{children}</div>;
}
