import { cn } from "@udecode/cn";
import { InputHTMLAttributes, forwardRef } from "react";

interface TextInputPropsType extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  icon?: JSX.Element | null;
  errorMessage?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputPropsType>(
  ({ isInvalid = false, icon = null, errorMessage, ...props }, ref) => {
    return (
      <>
        <div
          className={`border-solid flex items-center justify-between border ${
            isInvalid ? "border-red-500" : "border-zinc-200 "
          } rounded-lg p-3 ${props.width}`}
        >
          <input
            {...props}
            ref={ref}
            className={cn(
              "bg-transparent border-none w-full text-xs text-zinc-700 font-normal outline-none",
              props.className
            )}
          />
          {icon}
        </div>
        { errorMessage && <span className="text-xs text-red-500 font-light ml-2">{errorMessage}</span>}
      </>
    );
  }
);

TextInput.displayName = "TextInput";

export { TextInput };

