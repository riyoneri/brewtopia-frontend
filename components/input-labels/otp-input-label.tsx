"use client";

import { AllInputsProperties } from "@/utils/input-properties";
import classNames from "classnames";
import { Controller, useFormContext } from "react-hook-form";
import OTPInput from "react-otp-input";

type OtpInputLabelProperties = Pick<
  AllInputsProperties,
  "title" | "placeholder"
>;

export default function OtpInputLabel({
  title,
  placeholder,
}: OtpInputLabelProperties) {
  const {
    formState: { errors },
  } = useFormContext<{ otp: string }>();

  return (
    <label htmlFor={title} className="grid gap-1">
      <Controller
        name="otp"
        render={({ field }) => (
          <OTPInput
            {...field}
            placeholder={placeholder}
            numInputs={4}
            shouldAutoFocus
            skipDefaultStyles
            inputType="number"
            containerStyle="!grid grid-cols-4 text-lg xs:text-xl gap-2 xs:gap-5"
            inputStyle={classNames(
              "border-2 p-1 xs:p-2 focus:outline-primary text-center",
              {
                "border-accent-red/70": errors.otp,
              },
            )}
            renderInput={(properties) => <input id={title} {...properties} />}
          />
        )}
      />

      {errors.otp && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
          {errors.otp.message}
        </p>
      )}
    </label>
  );
}
