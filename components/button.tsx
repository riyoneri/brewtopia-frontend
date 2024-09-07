import classNames from "classnames";
import { ComponentProps, PropsWithChildren } from "react";

interface ButtonProperties extends ComponentProps<"button"> {
  variant?: "outline" | "solid";
}

export default function Button({
  className,
  type = "button",
  variant = "solid",
  children,
  disabled,
  onClick,
}: PropsWithChildren<ButtonProperties>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={classNames("border transition py-1 px-4", className, {
        "bg-primary border-primary hover:border-primary/0 hover:bg-primary/80 text-white":
          variant === "solid",
        "text-primary hover:bg-primary hover:text-white": variant === "outline",
      })}
    >
      {children}
    </button>
  );
}
