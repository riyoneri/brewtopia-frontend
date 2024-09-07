"use client";

import Button from "@/components/button";
import useAdminVerifyEmail from "@/hooks/admin/use-admin-verify-email";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmail() {
  const searchParameters = useSearchParams();
  const router = useRouter();
  const { mutate, data, error, isPending } =
    useAdminVerifyEmail<Record<"token", string>>();

  const token = searchParameters.get("token");

  useEffect(() => {
    if (token) {
      mutate(JSON.stringify({ token }));
    }
  }, [mutate, token]);

  if (!token) return notFound();

  return (
    <>
      <title>Verify email</title>

      <div className="mx-auto flex w-full flex-col items-center gap-3 p-4 text-center sm:w-2/3">
        {isPending && (
          <span className="dui-loading dui-loading-spinner dui-loading-lg"></span>
        )}
        {data ? (
          <>
            <p className="text-balance ">
              Congratulations! 🎉 Your email has been successfully verified.
              Welcome to the app! You can now login
            </p>
            <Button onClick={() => router.replace("./login")}>
              Go To Login
            </Button>
          </>
        ) : (
          <>
            {!error && (
              <>
                <p className="font-medium">
                  Hang tight! We’re validating your token.
                </p>
                <p className="text-balance italic">
                  In the meantime, why not enjoy a cup of virtual coffee ☕ or
                  ponder the mysteries of the universe? 🌌 Your verification is
                  in good hands!
                </p>
              </>
            )}
          </>
        )}
        {error && (
          <p className="text-sm text-accent-red">
            {error.errorMessage || error.validationErrors.token}
          </p>
        )}
      </div>
    </>
  );
}
