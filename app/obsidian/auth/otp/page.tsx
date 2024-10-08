"use client";

import Button from "@/components/button";
import OtpInputLabel from "@/components/input-labels/otp-input-label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const inputsSchema = z.object({
  otp: z
    .string({ required_error: "Enter otp code please" })
    .min(4, "Enter valid code please"),
});

type InputsType = z.infer<typeof inputsSchema>;

export default function AdminOTP() {
  const router = useRouter();
  const methods = useForm<InputsType>({ resolver: zodResolver(inputsSchema) });

  const onSubmit = (_data: InputsType) => {
    router.replace("./new-password");
  };

  return (
    <>
      <title>Admin OTP Verification</title>
      <FormProvider {...methods}>
        <form
          className="mx-auto flex w-full flex-col gap-5 sm:w-2/3 sm:gap-8 xl:w-1/3"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <h1 className="text-3xl">Enter Code</h1>
            <p>
              We sent a code to{" "}
              <span className="font-medium underline">brewtopia@gmail.com</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <OtpInputLabel title="Otp" placeholder="0000" />

            <Button type="submit" className="w-full">
              Set New Password
            </Button>
            <Button variant="outline" className="w-full">
              Resend
            </Button>
          </div>

          <p className="text-center">
            Back to{" "}
            <Link href="./login" className="font-medium underline">
              Sign In
            </Link>
          </p>
        </form>
      </FormProvider>
    </>
  );
}
