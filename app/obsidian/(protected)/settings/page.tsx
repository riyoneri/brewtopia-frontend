"use client";

import Button from "@/components/button";
import PasswordInputLabel from "@/components/input-labels/password-input-label";
import TextInputLabel from "@/components/input-labels/text-input-label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

export default function SettingsPage() {
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<InputsType>({ resolver: zodResolver(inputsSchema) });

  const onSubmit = (data: InputsType) => data;

  const passwordValue = watch("password");
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
      <title>Settings</title>
      <div className="space-y-5">
        <h3 className="text-center text-xl font-medium xs:text-2xl">
          Change Account settings
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex w-full flex-col gap-3 border-2 p-5 lg:w-2/3"
        >
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

          <span className="dui-divider text-neutral-400">Change Password</span>

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

          {/* {error?.message && (
            <p className="text-center text-sm text-accent-red xs:text-base">
              {error.message}
            </p>
          )} */}

          <Button type="submit" className="mt-3 flex justify-center text-base">
            {false ? (
              <span className="dui-loading dui-loading-spinner"></span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
