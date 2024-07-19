"use client";

import { Circle } from "@phosphor-icons/react";
import { cn } from "@udecode/cn";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text" | "confirm" | "cancel";
  text?: string;
  size?: "lg" | "md" | "sm";
  fullWidth?: boolean;
  width?: string;
  isLoading?: boolean;
  icon?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      text,
      size = "md",
      fullWidth = false,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "text-zinc-200 bg-zinc-800 border-solid border border-zinc-800 hover:bg-zinc-900 transition-all duration-75",
      secondary:
        "bg-zinc-200 text-zinc-700 border-solid border border-zinc-300",
      text: "bg-transparent text-zinc-600 underline underline-offset-4",
      confirm:
        "bg-green-500 text-white border border-solid border-green-500 hover:bg-green-400",
      cancel:
        "bg-red-500 text-white border border-solid border-red-500 hover:bg-red-400",
    } as const;

    const sizes = {
      lg: "text-lg p-4",
      md: "text-sm p-2",
      sm: "text-xs p-1",
    } as const;

    return (
      <button
        className={cn(
          `rounded-lg min-w-7 text-center justify-center  under ${
            variants[variant]
          } ${sizes[size]} ${fullWidth && "w-full"} flex items-center ${
            props.width
          } ${isLoading && "opacity-90 gap-2 cursor-not-allowed"}`,
          props.className
        )}
        {...props}
        ref={ref}
      >
        {isLoading && <Circle className="w-4 h-4 animate-spin " />}
        {isLoading ? "Loading ..." : text}
        {props.icon && props.icon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

