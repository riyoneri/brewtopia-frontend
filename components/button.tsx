import classNames from "classnames";
import { PropsWithChildren } from "react";

interface ButtonProperties {
  type: "button" | "submit";
  variant: "outline" | "solid";
  className?: string;
  onclick?: () => void;
}

export default function Button({
  className,
  type = "button",
  variant = "solid",
  children,
  onclick,
}: PropsWithChildren<Partial<ButtonProperties>>) {
  return (
    <button
      onClick={onclick}
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
