"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function AdminDonePasswordReset() {
  const router = useRouter();

  return (
    <>
      <title>Reset Password Done</title>
      <div className="mx-auto mt-10 flex w-full flex-col gap-5 sm:w-2/3 sm:gap-8 xl:w-1/3">
        <div className="space-y-2">
          <h1 className="text-3xl">All Done!</h1>
          <p>Your password has been successfully reset.</p>
        </div>

        <Button type="submit" onClick={() => router.replace("./login")}>
          Back to Sign in
        </Button>
      </div>
    </>
  );
}
