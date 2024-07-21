"use client";

import {
  hasLowercase,
  hasOneDigit,
  hasUppercase,
} from "@/utils/password-criteria";
import { Check, X } from "@phosphor-icons/react";
import { Alert, AlertDescription, AlertTitle } from "./ui";

type PasswordValidationTypeProps = {
  show: boolean;
  password: string;
};

export function PasswordValidation({
  password,
  show,
}: PasswordValidationTypeProps) {
  if (!show) return null;
  return (
    <Alert>
      <AlertTitle>Password Criterias</AlertTitle>
      <AlertDescription className="mt-5">
        <div className="flex items-center justify-start gap-2">
          {hasUppercase(password) ? (
            <Check data-testid="uppercase-successful" weight="bold" className="w-4 h-4 text-green-500" />
          ) : (
            <X  data-testid="uppercase-unsuccessful"weight="bold" className="w-4 h-4 text-red-500" />
          )}
          <span>Ensures at least one uppercase letter. </span>
        </div>
        <div className="flex items-center justify-start gap-2">
          {hasOneDigit(password) ? (
            <Check data-testid="one-digit-successful" weight="bold" className="w-4 h-4 text-green-500" />
          ) : (
            <X data-testid="one-digit-unsuccessful" weight="bold" className="w-4 h-4 text-red-500" />
          )}
          <span>Ensures at least one digit. </span>
        </div>
        <div className="flex items-center justify-start gap-2">
          {hasLowercase(password) ? (
            <Check data-testid="lowercase-successful" weight="bold" className="w-4 h-4 text-green-500" />
          ) : (
            <X data-testid="lowercase-unsuccessful" weight="bold" className="w-4 h-4 text-red-500" />
          )}
          <span>Ensures at least one lowercase letter. </span>
        </div>
        <div className="flex items-center justify-start gap-2">
          {password.length >= 5 ? (
            <Check data-testid="password-length-successful" weight="bold" className="w-4 h-4 text-green-500" />
          ) : (
            <X data-testid="password-length-unsuccessful" weight="bold" className="w-4 h-4 text-red-500" />
          )}
          <span>ensures the password has at least 5 characters. </span>
        </div>
      </AlertDescription>
    </Alert>
  );
}
