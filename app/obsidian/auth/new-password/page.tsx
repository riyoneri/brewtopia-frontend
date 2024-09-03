"use client";

import Button from "@/components/button";
import PasswordInputLabel from "@/components/input-labels/password-input-label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z
  .object({
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

export default function AdminNewPassword() {
  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<InputsType>({ resolver: zodResolver(inputsSchema) });

  const passwordValue = watch("password");

  const onSubmit = (_data: InputsType) => {
    router.replace("./done");
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
    <form
      className="mx-auto flex w-full flex-col gap-5 sm:w-2/3 sm:gap-8 xl:w-1/3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <h1 className="text-3xl">Set a New Password</h1>
        <p>
          No worries we&apos;ll make sure that it is as secured as the previous
          one
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <PasswordInputLabel
          title="Password"
          placeholder="Enter password"
          register={register("password")}
          validations={passwordValidations}
          error={errors.password?.message && " "}
        />
        <PasswordInputLabel
          title="Confirm Password"
          placeholder="Enter password"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit">Reset Password</Button>
      </div>

      <p className="text-center">
        Back to{" "}
        <Link href="./login" className="font-medium underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}
