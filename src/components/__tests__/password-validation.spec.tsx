import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PasswordValidation } from "../password-validation";

describe("<PasswordValidation />", () => {
  it("should be show steps of validations password successful", () => {
    const { getByTestId } = render(<PasswordValidation password="2023Mudar@123" show /> );

    const uppercaseShowCorrectIcon = getByTestId("uppercase-successful")
    const lowercaseShowCorrectIcon = getByTestId("lowercase-successful") 
    const oneDigitShowCorrectIcon = getByTestId("one-digit-successful")
    const passwordLengthShowCorrectIcon = getByTestId("password-length-successful")

    expect(uppercaseShowCorrectIcon).toBeTruthy()
    expect(lowercaseShowCorrectIcon).toBeTruthy()
    expect(oneDigitShowCorrectIcon).toBeTruthy()
    expect(passwordLengthShowCorrectIcon).toBeTruthy()
  });

  it("should be show steps of validations password unsuccessful", () => {
    const { getByTestId } = render(<PasswordValidation password="" show /> );

    const uppercaseShowCorrectIcon = getByTestId("uppercase-unsuccessful")
    const lowercaseShowCorrectIcon = getByTestId("lowercase-unsuccessful") 
    const oneDigitShowCorrectIcon = getByTestId("one-digit-unsuccessful")
    const passwordLengthShowCorrectIcon = getByTestId("password-length-unsuccessful")

    expect(uppercaseShowCorrectIcon).toBeTruthy()
    expect(lowercaseShowCorrectIcon).toBeTruthy()
    expect(oneDigitShowCorrectIcon).toBeTruthy()
    expect(passwordLengthShowCorrectIcon).toBeTruthy()
  });
});
