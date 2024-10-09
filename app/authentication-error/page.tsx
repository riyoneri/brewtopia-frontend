"use client";

import BrokenIllustration from "@/assets/illustrations/broken.illustration";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { Suspense } from "react";

interface ErrorMessages {
  Configuration: string;
  AccessDenied: string;
  Verification: string;
  Default: string;
}

const errorMessages: ErrorMessages = {
  Configuration:
    "There is a problem with the server configuration. Please try again later.",
  AccessDenied:
    "You do not have permission to access this page. Please contact support if you believe this is an error.",
  Verification:
    "The verification token has expired or has already been used. Please request a new verification link.",
  Default:
    "An unknown error occurred. Please try again or contact support if the issue persists.",
};

function AuthenticationErrorPage() {
  const router = useRouter();
  const [error] = useQueryState<keyof ErrorMessages | undefined>("error", {
    parse: (value: string) =>
      (value || undefined) as keyof ErrorMessages | undefined,
  });

  const errorMessage = errorMessages[error ?? "Default"];

  return (
    <>
      <title>Brewtopia - Authentication Error</title>
      <main className="bg-tertiary">
        <div className="maximum-width flex min-h-dvh flex-col items-center space-y-5 py-10 text-center xs:text-balance">
          <BrokenIllustration className="w-1/2 sm:w-1/3 md:w-1/5" />
          <h2 className="text-xl font-medium underline underline-offset-8 xs:text-2xl sm:text-3xl lg:text-5xl">
            Authentication Error
          </h2>
          <p>{errorMessage}</p>
          <Button onClick={() => router.back()}>Go back</Button>
        </div>
      </main>
    </>
  );
}

export default function WrappedAuthenticationPage() {
  return (
    <Suspense>
      <AuthenticationErrorPage />
    </Suspense>
  );
}
