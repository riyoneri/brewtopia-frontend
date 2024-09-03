"use client";

import classNames from "classnames";
import { useState } from "react";
import OTPInput from "react-otp-input";

import { AllInputsProperties } from "./text-input-label";

interface OtpInputLabelProperties
  extends Omit<AllInputsProperties, "register"> {
  setValue: (_value: string) => void;
}

export default function OtpInputLabel({
  title,
  placeholder,
  error,
  setValue,
}: OtpInputLabelProperties) {
  const [otp, setOtp] = useState("");

  return (
    <label htmlFor={title} className="grid gap-1">
      <OTPInput
        value={otp}
        onChange={(value) => {
          setOtp(value);
          setValue(value);
        }}
        placeholder={placeholder}
        numInputs={4}
        shouldAutoFocus
        skipDefaultStyles
        inputType="number"
        containerStyle="!grid grid-cols-4 text-lg xs:text-xl gap-2 xs:gap-5"
        inputStyle={classNames(
          "border-2 p-1 xs:p-2 focus:outline-primary text-center",
          {
            "border-accent-red/70": error,
          },
        )}
        renderInput={(properties) => <input {...properties} />}
      />

      {error && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
          {error}
        </p>
      )}
    </label>
  );
}
