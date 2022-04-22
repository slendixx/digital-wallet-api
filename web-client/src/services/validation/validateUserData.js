import ValidationError from "./ValidationError";

export const validateEmail = (value) => {
  if (value === "") throw new ValidationError("No email was provided");
};

export const validatePassword = (value) => {
  if (value === "") throw new ValidationError("No password was provided");
};
