import { AllInputsProperties } from "@/utils/input-properties";
import classNames from "classnames";

interface TextInputLabelProperties extends AllInputsProperties {
  type?: "email" | "text";
}

export default function TextInputLabel({
  type = "text",
  title,
  register,
  placeholder,
  error,
}: TextInputLabelProperties) {
  return (
    <label htmlFor={title} className="grid gap-1">
      <p>{title}</p>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        id={title}
        className={classNames("border-2 px-2 py-1 outline-none", {
          "border-secondary/50": !error,
          "border-accent-red": error,
        })}
      />
      {error && (
        <p className="-mt-1 ml-0.5 text-xs text-accent-red  xs:text-sm">
          {error}
        </p>
      )}
    </label>
  );
}
