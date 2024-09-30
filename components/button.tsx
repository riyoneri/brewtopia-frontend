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
      className={classNames(
        "border-2 disabled:cursor-not-allowed transition py-1 px-4",
        className,
        {
          "bg-primary disabled:bg-primary/50 disabled:border-primary/20 border-primary hover:border-primary/0 hover:bg-primary/80 text-white":
            variant === "solid",
          "text-primary disabled:bg-primary/30 disabled:hover:text-primary border-primary/50 hover:bg-primary hover:text-white":
            variant === "outline",
        },
      )}
    >
      {children}
    </button>
  );
}
