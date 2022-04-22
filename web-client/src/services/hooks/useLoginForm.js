import { useState, useEffect } from "react";
import useRequestAPI from "./useRequestAPI";
import {
  validateEmail,
  validatePassword,
} from "../validation/validateUserData";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setformSubmitted] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);
  const { sendRequest } = useRequestAPI();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
      validatePassword(password);
    } catch (error) {
      handleValidationError(error);
      return;
    }

    //send request
    setformSubmitted(true);
  };

  const resolveHandler = (response) => {
    console.log(response);
    setUnauthorized(false);
    setformSubmitted(false);
    setValidationError("");
  };
  const rejectHandler = (response) => {
    setUnauthorized(true);
    setformSubmitted(false);
    setValidationError("");
  };

  useEffect(() => {
    if (!formSubmitted) return;
    sendRequest({
      method: "post",
      url: "/auth/login",
      data: { email, password },
      withCredentials: false,
      resolveHandler,
      rejectHandler,
    });
  }, [formSubmitted, email, password, sendRequest]);
  return {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    handleSubmit,
    validationError,
    validationErrorMessage,
    unauthorized,
  };
};

export default useLoginForm;
