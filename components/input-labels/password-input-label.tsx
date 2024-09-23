"use client";

import { AllInputsProperties } from "@/utils/input-properties";
import classNames from "classnames";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface PasswordInputLabelProperties extends AllInputsProperties {
  validations?: { isValid: boolean; validationMessage: string }[];
}

export default function PasswordInputLabel({
  title,
  register,
  placeholder,
  error,
  validations,
}: PasswordInputLabelProperties) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const allValid = validations?.every((validation) => validation.isValid);

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

      <AnimatePresence>
        {validations?.length && !allValid && (
          <motion.div
            initial={{ height: "0" }}
            animate={{ height: "100%" }}
            exit={{ height: "0" }}
            transition={{ duration: 0.2, ease: easeOut }}
            className={classNames("space-y-1 overflow-hidden text-sm")}
          >
            {validations?.map((validation) => (
              <div key={validation.validationMessage}>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    readOnly
                    checked={validation.isValid}
                    className="dui-checkbox dui-checkbox-xs [--chkbg:theme(colors.accent.green)] checked:border-none"
                  />
                  <span>{validation.validationMessage}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
          {error}
        </p>
      )}
    </label>
  );
}
