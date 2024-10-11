"use client";

import Button from "@/components/button";
import useVerifyEmail from "@/hooks/user/use-verify-email";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const searchParameters = useSearchParams();
  const router = useRouter();
  const [requestSent, setRequestSent] = useState(false);
  const { mutate, data, error, isPending } =
    useVerifyEmail<Record<"token", string>>();

  const token = searchParameters.get("token");

  useEffect(() => {
    if (token && !requestSent) {
      mutate(JSON.stringify({ token }));
    }
    setRequestSent(true);
  }, [mutate, requestSent, token]);

  if (!token) return notFound();

  return (
    <>
      <title>Verify email</title>

      <div className="mx-auto flex w-full flex-col items-center gap-3 p-4 text-center sm:w-2/3">
        {isPending && (
          <>
            <span className="dui-loading dui-loading-spinner dui-loading-lg bg-primary"></span>
            <p>Hang up tight we are verifying your token</p>
          </>
        )}
        {data && (
          <>
            <p className="text-balance ">
              Congratulations! 🎉 Your email has been successfully verified.
              Welcome to the app! You can now login
            </p>
            <Button onClick={() => router.replace("./login")}>
              Go To Login
            </Button>
          </>
        )}
        {error && (
          <p className="text-sm text-accent-red">
            {error.message || error.validationErrors.token}
          </p>
        )}
      </div>
    </>
  );
}
