import ValidationError from "./ValidationError";

const TEXT_MAX_LENGTH = 255;
const MIN_PASSWORD_LENGTH = 12;

export const validateFirstName = (value) => {
  if (value === "") throw new ValidationError("No first name was provided");
  if (value.length > TEXT_MAX_LENGTH)
    throw new ValidationError("First name is too long");
};
export const validateLastName = (value) => {
  if (value === "") throw new ValidationError("No last name was provided");
  if (value.length > TEXT_MAX_LENGTH)
    throw new ValidationError("Last name is too long");
};
export const validateEmail = (value) => {
  if (value === "") throw new ValidationError("No email was provided");
  if (value.length > TEXT_MAX_LENGTH)
    throw new ValidationError("Email is too long");
};
export const validatePassword = (value) => {
  if (value === "") throw new ValidationError("No password was provided");
  if (value.length < MIN_PASSWORD_LENGTH)
    throw new ValidationError("Password must be at least 12 characters long");
  if (value.length > TEXT_MAX_LENGTH)
    throw new ValidationError("Password is too long");
};
export const validateConfirmPassword = (value, compareValue) => {
  if (value === "")
    throw new ValidationError("No confirm password was provided");
  if (value !== compareValue)
    throw new ValidationError("Passwords don't match");
  if (value.length > TEXT_MAX_LENGTH)
    throw new ValidationError("Confirm password is too long");
};
