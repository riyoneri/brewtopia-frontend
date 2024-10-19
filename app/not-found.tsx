"use client";

import Button from "@/components/button";
import NotFoundIllustration from "@/components/illustrations/not-found.illustration";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <>
      <title>Brewtopia - Page Not Found</title>
      <main className="bg-tertiary">
        <div className="maximum-width flex min-h-dvh flex-col items-center space-y-5 py-10 text-center xs:text-balance">
          <NotFoundIllustration className="w-1/2 sm:w-1/3 md:w-1/5" />
          <h2 className="text-xl font-medium underline underline-offset-8 xs:text-2xl sm:text-3xl lg:text-5xl">
            Page Not Found
          </h2>
          <p className="">
            It seems the page you&apos;re looking for doesn&apos;t exist. You
            might have followed a broken link or mistyped the URL.
          </p>
          <p>Don&apos;t worry, you can head back to previous page</p>
          <Button onClick={() => router.back()}>Go back</Button>
        </div>
      </main>
    </>
  );
}
