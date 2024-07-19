const nameRegex = /^(?=.*[A-Z])(?=.*[a-z])[A-Za-z\s]{5,}$/;

export function validateUsername(name : string) {
  return nameRegex.test(name);
}
