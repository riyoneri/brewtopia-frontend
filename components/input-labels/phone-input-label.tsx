"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";

import { AllInputsProperties } from "./text-input-label";

interface PhoneInputLabelProperties
  extends Omit<AllInputsProperties, "register"> {
  setValue: (_value: string) => void;
}

export default function PhoneInputLabel({
  title,
  error,
  placeholder,
  setValue,
}: PhoneInputLabelProperties) {
  const [phone, setPhone] = useState("");
  return (
    <label className="grid gap-1">
      <p>{title}</p>

      <PhoneInput
        placeholder={placeholder}
        autoFormat
        onChange={(value) => {
          setPhone(value);
          setValue(value);
        }}
        value={phone}
      />

      {error && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
          {error}
        </p>
      )}
    </label>
  );
}
