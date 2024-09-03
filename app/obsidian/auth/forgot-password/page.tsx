"use client";

import Button from "@/components/button";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z.object({
  email: z
    .string()
    .min(1, "Enter your email please")
    .email("Enter valid email"),
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
        <h1 className="text-3xl">Forgot Password</h1>
        <p>No worries, we&apos;ll send you reset instructions</p>
      </div>

      <div className="flex flex-col gap-3">
        <TextInputLabel
          title="Email"
          placeholder="Enter email"
          register={register("email")}
          error={errors.email?.message}
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
