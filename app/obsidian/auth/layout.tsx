"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/obsidian");
  }, [status, router]);

  if (status === "loading")
    return (
      <div className="grid min-h-dvh place-content-center">
        <span className="dui-loading dui-loading-spinner bg-primary"></span>
      </div>
    );

  if (status === "authenticated") return;

  return <div className="min-h-dvh p-5">{children}</div>;
}
