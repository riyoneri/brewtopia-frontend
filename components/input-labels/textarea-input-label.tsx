import { AllInputsProperties } from "@/utils/input-properties";
import classNames from "classnames";

export default function TextAreaInputLabel({
  title,
  register,
  placeholder,
  error,
}: AllInputsProperties) {
  return (
    <label htmlFor={title} className="grid gap-1">
      <p>{title}</p>
      <textarea
        placeholder={placeholder}
        id={title}
        {...register}
        className={classNames(
          "border-2 scrollbar-thin px-2 py-1 outline-none",
          {
            "border-secondary/50": !error,
            "border-accent-red": error,
          },
        )}
      ></textarea>
      {error && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
          {error}
        </p>
      )}
    </label>
  );
}
