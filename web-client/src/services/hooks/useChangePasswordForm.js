import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRequestAPI from "./useRequestAPI";
import * as validation from "../validation/validateUserData";

const useSignupForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formSubmitted, setformSubmitted] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);
  const { sendRequest } = useRequestAPI();
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleValidationError = (validationError) => {
    setValidationError(true);
    setValidationErrorMessage(validationError.getMessage());
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //validate input
    try {
      validation.validatePassword(password);
      validation.validateConfirmPassword(confirmPassword, password);
    } catch (error) {
      handleValidationError(error);
      return;
    }

    //send request
    setformSubmitted(true);
  };

  const resolveHandler = (response) => {
    setUnauthorized(false);
    setformSubmitted(false);
    setValidationError(false);
    navigate("/login", { replace: true, state: { passwordChanged: true } });
  };
  const rejectHandler = (response) => {
    setUnauthorized(true);
    setformSubmitted(false);
    setValidationError(false);
  };

  useEffect(() => {
    if (!formSubmitted) return;

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    sendRequest({
      method: "patch",
      url: "/auth/change-password",
      data: { newPassword: password, passwordRecoveryToken: token },
      withCredentials: false,
      resolveHandler,
      rejectHandler,
    });
    setUnauthorized(false);
    setformSubmitted(false);
    setValidationError(false);
  }, [formSubmitted, password, sendRequest]);
  return {
    password,
    handlePasswordChange,
    confirmPassword,
    handleConfirmPasswordChange,
    handleSubmit,
    validationError,
    validationErrorMessage,
    unauthorized,
  };
};

export default useSignupForm;
