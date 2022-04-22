import { useState, useEffect } from "react";
import useRequestAPI from "./useRequestAPI";
import { validateEmail } from "../validation/validateUserData";

const useForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [formSubmitted, setformSubmitted] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);
  const [success, setSuccess] = useState(false);
  const { sendRequest } = useRequestAPI();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleValidationError = (validationError) => {
    setValidationError(true);
    setValidationErrorMessage(validationError.getMessage());
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //validate input
    try {
      validateEmail(email);
    } catch (error) {
      handleValidationError(error);
      return;
    }

    //send request
    setformSubmitted(true);
  };

  const resolveHandler = (response) => {
    setUnauthorized(false);
    setSuccess(true);
    setformSubmitted(false);
    setValidationError(false);
  };
  const rejectHandler = (response) => {
    setUnauthorized(true);
    setSuccess(false);
    setformSubmitted(false);
    setValidationError(false);
  };

  useEffect(() => {
    if (!formSubmitted) return;
    sendRequest({
      method: "post",
      url: "/auth/forgot-password",
      data: { email },
      withCredentials: false,
      resolveHandler,
      rejectHandler,
    });
    setUnauthorized(false);
    setSuccess(false);
    setformSubmitted(false);
    setValidationError(false);
  }, [formSubmitted, email, sendRequest]);
  return {
    email,
    handleEmailChange,
    handleSubmit,
    validationError,
    validationErrorMessage,
    unauthorized,
    success,
  };
};

export default useForgotPasswordForm;
