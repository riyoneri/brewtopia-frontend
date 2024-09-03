"use client";

import Button from "@/components/button";
import PasswordInputLabel from "@/components/input-labels/password-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const inputsSchema = z
  .object({
    name: z.string().min(1, "Enter your name please"),
    email: z.string().email("Enter valid email"),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type InputsType = z.infer<typeof inputsSchema>;

export default function AdminRegister() {
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<InputsType>({ resolver: zodResolver(inputsSchema) });

  const passwordValue = watch("password");

  const onSubmit = (data: InputsType) => {
    data;
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
        <h1 className="text-3xl">Create Your Account</h1>
        <p>Create an account to manage app data</p>
      </div>

      <Link
        href=""
        className="flex items-center justify-center gap-2 border-2 border-secondary/50 px-2 py-1 transition  hover:bg-tertiary/20"
      >
        <FcGoogle />
        Sign up with Google
      </Link>

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
        />
        <PasswordInputLabel
          title="Confirm Password"
          placeholder="Enter password"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" className="mt-3">
          Sign Up
        </Button>
      </div>

      <p className="text-center">
        Already have an account?{" "}
        <Link href="./login" className="font-medium underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}