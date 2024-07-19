const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
const hasUppercaseRegex = /^(?=.*[A-Z])/
const hasLowercaseRegex = /(?=.*[a-z])/
const hasOneDigitRegex = /(?=.*\d)/
const hasOneSpecialCharacterRegex = /(?=.*[@$!%*?&])/

export function validatePassword(password : string) {
  return passwordRegex.test(password);
}

export function hasUppercase(password : string ) {
  return hasUppercaseRegex.test(password)
}

export function hasLowercase(password : string ) {
  return hasLowercaseRegex.test(password)
}

export function hasOneDigit(password : string ) {
  return hasOneDigitRegex.test(password)
}

export function hasOneSpecialCharacter(password : string ) {
  return hasOneSpecialCharacterRegex.test(password)
}
