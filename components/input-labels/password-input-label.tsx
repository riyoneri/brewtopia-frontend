"use client";

import classNames from "classnames";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { AllInputsProperties } from "./text-input-label";

export default function PasswordInputLabel({
  title,
  register,
  placeholder,
  error,
}: AllInputsProperties) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <label htmlFor={title} className="grid gap-1">
      <p>{title}</p>
      <div
        className={classNames("border-2 flex px-2 py-1 items-center", {
          "border-secondary/50": !error,
          "border-accent-red": error,
        })}
      >
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder={placeholder}
          {...register}
          id={title}
          className="flex-1 outline-none"
        />
        <button
          className="text-xl"
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
      </div>
      {error && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
          {error}
        </p>
      )}
    </label>
  );
}
