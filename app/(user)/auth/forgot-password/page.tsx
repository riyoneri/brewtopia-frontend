"use client";

import Button from "@/components/button";
import TextInputLabel from "@/components/input-labels/text-input-label";
import ForgotPasswordModal from "@/components/modals/forgot-password-modal";
import useForgotPassword from "@/hooks/user/use-forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z.object({
  email: z
    .string()
    .min(1, "Enter your email please")
    .email("Enter valid email"),
});

type InputsType = z.infer<typeof inputsSchema & { redirectUrl: string }>;

export default function ForgotPassword() {
  const [redirectUrl, setRedirectUrl] = useState("");

  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm<InputsType>({ resolver: zodResolver(inputsSchema) });
  const { data, error, isPending, mutate } = useForgotPassword<InputsType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window && setRedirectUrl(`${window.location.origin}/auth/new-password`);

    data && setIsModalOpen(true);

    error?.validationErrors?.email &&
      setError("email", { message: error.validationErrors.email });
  }, [data, error, setError]);

  const onSubmit = (data: InputsType) => {
    mutate(JSON.stringify({ ...data, redirectUrl }));
  };

  return (
    <>
      <title>Forgot password</title>
      {isModalOpen && <ForgotPasswordModal />}
      <form
        className="mx-auto flex w-full flex-col gap-5 sm:w-2/3 sm:gap-8 xl:w-1/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2">
          <h1 className="text-3xl">Forgot Password</h1>
          <p>No worries, we&apos;ll send you reset instructions</p>
        </div>
        <div className="flex flex-col gap-5">
          <TextInputLabel
            title="Email"
            placeholder="Enter email"
            register={register("email")}
            error={errors.email?.message}
          />

          {error?.message && (
            <p className="text-center text-sm text-accent-red xs:text-base">
              {error.message}
            </p>
          )}

          <Button
            disabled={isPending || isModalOpen}
            type="submit"
            className="flex justify-center text-base"
          >
            {isPending ? (
              <span className="dui-loading dui-loading-spinner"></span>
            ) : (
              "Reset Password"
            )}
          </Button>
        </div>

        <p className="text-center">
          Back to{" "}
          <Link href="./login" className="font-medium underline">
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
}
