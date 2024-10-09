"use client";

import Button from "@/components/button";
import PasswordInputLabel from "@/components/input-labels/password-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import ConfirmEmailModal from "@/components/modals/confirm-email-modal";
import useRegisterAdmin from "@/hooks/admin/use-admin-register";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const inputsSchema = z
  .object({
    name: z.string().min(1, "Enter your name please"),
    email: z.string().email("Enter valid email"),
    password: z
      .string()
      .min(8)
      .regex(/\W|_/)
      .regex(/\d/)
      .regex(/[a-z]/)
      .regex(/[A-Z]/),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type InputsType = z.infer<typeof inputsSchema>;

export default function AdminRegister() {
  const [redirectUrl, setRedirectUrl] = useState("");
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setError,
    getValues,
  } = useForm<InputsType>({ resolver: zodResolver(inputsSchema) });

  const { isPending, mutate, error, data } = useRegisterAdmin<InputsType>();

  const passwordValue = watch("password");

  useEffect(() => {
    if (error?.validationErrors) {
      let key: keyof InputsType;

      for (key in error.validationErrors)
        setError(key, { message: error.validationErrors[key] });
    }
    setRedirectUrl(`http://127.0.0.1:3000/obsidian/auth/verify`);
  }, [error?.validationErrors, setError]);

  const onSubmit = (data: InputsType) => {
    mutate(JSON.stringify({ ...data, redirectUrl }));
  };

  const passwordValidations = [
    {
      isValid: z.string().regex(/[A-Z]/).safeParse(passwordValue).success,
      validationMessage: "Contains uppercase character",
    },
    {
      isValid: z.string().regex(/[a-z]/).safeParse(passwordValue).success,
      validationMessage: "Contains lowercase character",
    },
    {
      isValid: z.string().regex(/\d/).safeParse(passwordValue).success,
      validationMessage: "Contains number",
    },
    {
      isValid: z.string().regex(/\W|_/).safeParse(passwordValue).success,
      validationMessage: "Contains special character",
    },
    {
      isValid: z.string().min(8).safeParse(passwordValue).success,
      validationMessage: "Contains more than 8 characters",
    },
  ];

  return (
    <>
      <title>Admin Register</title>
      {data && (
        <ConfirmEmailModal
          email={getValues("email")}
          redirectUrl={redirectUrl}
        />
      )}
      <form
        className="mx-auto flex w-full flex-col gap-5 sm:w-2/3 sm:gap-8 xl:w-1/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2">
          <h1 className="text-3xl">Create Your Account</h1>
          <p>Create an account to manage app data</p>
        </div>

        <button
          onClick={() => signIn("google-admin", { callbackUrl: "/obsidian" })}
          type="button"
          className="flex items-center justify-center gap-2 border-2 border-secondary/50 px-2 py-1 transition  hover:bg-tertiary/20"
        >
          <FcGoogle />
          Sign up with Google
        </button>

        <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Button>

        <span className="dui-divider my-0">or</span>

        <div className="flex flex-col gap-3">
          <TextInputLabel
            title="Name"
            placeholder="Enter name"
            register={register("name")}
            error={errors.name?.message}
          />
          <TextInputLabel
            title="Email"
            placeholder="Enter email"
            register={register("email")}
            error={errors.email?.message}
          />
          <PasswordInputLabel
            title="Password"
            placeholder="Enter password"
            register={register("password")}
            validations={passwordValidations}
            error={
              error?.validationErrors?.password ||
              (errors.password?.message && " ")
            }
          />
          <PasswordInputLabel
            title="Confirm Password"
            placeholder="Enter password"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          {error?.message && (
            <p className="text-center text-sm text-accent-red xs:text-base">
              {error.message}
            </p>
          )}

          <Button type="submit" className="mt-3 flex justify-center text-base">
            {isPending ? (
              <span className="dui-loading dui-loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>

        <p className="text-center">
          Already have an account?{" "}
          <Link href="./login" className="font-medium underline">
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
}
