"use client";

import { AllInputsProperties } from "@/utils/input-properties";
import classNames from "classnames";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type PhoneInputLabelProperties = Pick<AllInputsProperties, "title">;

export default function PhoneInputLabel({ title }: PhoneInputLabelProperties) {
  const {
    formState: { errors },
  } = useFormContext<{ phoneNumber: string }>();

  return (
    <label className="grid gap-1" htmlFor={title}>
      <p>{title}</p>

      <Controller
        name="phoneNumber"
        render={({ field }) => (
          <PhoneInput
            country="rw"
            inputProps={{ id: title }}
            containerClass={classNames("border-2 flex sm:py-1", {
              "border-secondary/50": !errors.phoneNumber,
              "border-accent-red": errors.phoneNumber,
            })}
            {...field}
            autoFormat
            buttonClass="!bg-transparent !border-r-2 !border-secondary/50 !border-y-0 !flex !rounded-none !border-l-0 !p-0"
            inputClass="flex-1 !border-none !h-auto !w-auto"
          />
        )}
      />

      {errors.phoneNumber && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red xs:text-sm">
          {errors.phoneNumber.message}
        </p>
      )}
    </label>
  );
}
