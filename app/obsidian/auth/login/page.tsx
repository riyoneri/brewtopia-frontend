"use client";

import Button from "@/components/button";
import PasswordInputLabel from "@/components/input-labels/password-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const inputsSchema = z.object({
  email: z
    .string()
    .min(1, "Enter your email please")
    .email("Enter valid email"),
  password: z.string().min(1, "Enter your password please"),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function AdminLogin() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<InputsType>({ resolver: zodResolver(inputsSchema) });

  const onSubmit = (data: InputsType) => {
    data;
  };

  return (
    <form
      className="mx-auto flex w-full flex-col gap-5 sm:w-2/3 sm:gap-8 xl:w-1/3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <h1 className="text-3xl">Welcome Back</h1>
        <p>Enter your credentials to access your account.</p>
      </div>

      <Link
        href=""
        className="flex items-center justify-center gap-2 border-2 border-secondary/50 px-2 py-1 transition  hover:bg-tertiary/20"
      >
        <FcGoogle />
        Sign in with Google
      </Link>

      <span className="dui-divider my-0">or</span>

      <div className="flex flex-col gap-3">
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
          error={errors.password?.message}
        />
        <Link
          href="./forgot-password"
          className="-mt-2 self-end text-right text-accent-blue"
        >
          Forgot password?
        </Link>
        <Button type="submit">Submit</Button>
      </div>

      <p className="text-center">
        Don&apos;t have an account?{" "}
        <Link href="./register" className="font-medium underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
