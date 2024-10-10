import useRequestVerificationEmail from "@/hooks/user/use-request-verification-email";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCountdown } from "usehooks-ts";

import Button from "../button";

interface ConfirmEmailModalProperties {
  redirectUrl: string;
  email: string;
}

export default function ConfirmEmailModal(
  properties: ConfirmEmailModalProperties,
) {
  const router = useRouter();
  const [countDownTime, setCountDownTime] = useState(10);
  const [count, { resetCountdown, startCountdown }] = useCountdown({
    countStart: countDownTime,
  });
  const { data, error, mutate, isPending } =
    useRequestVerificationEmail<typeof properties>();

  useEffect(() => {
    if (count === 0) resetCountdown();
    if (error) {
      resetCountdown();
      setCountDownTime(10);
    }
  }, [count, data, error, resetCountdown]);

  let buttonContent = <>Resend</>;

  if (isPending) {
    buttonContent = (
      <span className="dui-loading dui-loading-sm sm:dui-loading-md"></span>
    );
  } else if (count !== countDownTime) {
    buttonContent = <>{count}</>;
  }

  return (
    <>
      <input
        type="checkbox"
        checked={true}
        readOnly
        className="dui-modal-toggle"
      />

      <dialog className="dui-modal dui-modal-middle" role="dialog">
        <div className="dui-modal-box flex flex-col items-center gap-2 rounded-none px-3 text-sm xs:px-5 sm:text-base">
          <button
            className="size-5 self-end leading-none transition hover:bg-tertiary  sm:size-7"
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            ✕
          </button>

          <h2 className="mb-2 font-medium xs:text-lg sm:text-xl">
            Registration Successful!
          </h2>

          <p className="text-pretty text-center">
            To get started please check your email inbox for a verification
            message from us. Click on the verification link to confirm your
            email address.
          </p>
          {data && (
            <p className="text-pretty text-center text-primary">
              Your email has been sent successfully.
            </p>
          )}
          <div className="dui-divider my-0"></div>
          <p className="flex w-full flex-col gap-1 text-center xs:w-fit xs:items-center xs:gap-2 sm:flex-row">
            Didn’t receive the email?{" "}
            <Button
              disabled={isPending || count !== countDownTime}
              onClick={() => {
                mutate(JSON.stringify(properties));
                startCountdown();
                setCountDownTime(
                  (previousCountDownTime) => (previousCountDownTime += 10),
                );
              }}
              className="flex justify-center bg-primary px-2 py-0 text-white"
            >
              {buttonContent}
            </Button>
          </p>
          {error && (
            <p className="text-sm text-accent-red">
              {error.message ||
                error.validationErrors.email ||
                error.validationErrors.redirectUrl}
            </p>
          )}
        </div>
        <label className="dui-modal-backdrop bg-black/80"></label>
      </dialog>
    </>
  );
}
