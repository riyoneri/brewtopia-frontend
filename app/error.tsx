"use client";

import ErrorIllustration from "@/components/illustrations/error.illustration";

export default function ErrorPage() {
  return (
    <>
      <title>Brewtopia - Error</title>
      <main className="bg-tertiary">
        <div className="maximum-width flex min-h-dvh flex-col items-center space-y-5 py-10 text-center xs:text-balance">
          <ErrorIllustration className="w-1/2 sm:w-1/3 md:w-1/4" />
          <h2 className="text-xl font-medium underline underline-offset-8 xs:text-2xl sm:text-3xl lg:text-5xl">
            Oops! Something Went Wrong
          </h2>
          <p>
            We&apos;re sorry, but it looks like something went wrong on our end.
          </p>

          <p>
            Please try refreshing the page or come back later. If the problem
            persists, feel free to contact our support team.
          </p>

          <p className="font-semibold">Thank you for your patience!</p>
        </div>
      </main>
    </>
  );
}
