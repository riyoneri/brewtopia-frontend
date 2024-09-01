"use client";

import Button from "@/components/button";
import PasswordInputLabel from "@/components/input-labels/password-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z.object({
  email: z.string().email("Enter valid email"),
  password: z.string(),
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
      className="mx-auto w-full sm:w-2/3 lg:w-1/3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h1 className="text-3xl">Welcome Back</h1>
        <p>Enter your credentials to access your account.</p>
      </div>
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

      <Button type="submit">Submit</Button>
    </form>
  );
}
