import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRequestAPI from "./useRequestAPI";
import * as validation from "../validation/validateUserData";

const useSignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formSubmitted, setformSubmitted] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);
  const { sendRequest } = useRequestAPI();
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
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
      validation.validateFirstName(firstName);
      validation.validateLastName(lastName);
      validation.validateEmail(email);
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
    navigate("/login", { replace: true, state: { accountCreated: true } });
  };
  const rejectHandler = (response) => {
    setUnauthorized(true);
    setformSubmitted(false);
    setValidationError(false);
  };

  useEffect(() => {
    if (!formSubmitted) return;
    sendRequest({
      method: "post",
      url: "/users",
      data: { firstName, lastName, email, password },
      withCredentials: false,
      resolveHandler,
      rejectHandler,
    });
    setUnauthorized(false);
    setformSubmitted(false);
    setValidationError(false);
  }, [formSubmitted, email, password, sendRequest]);
  return {
    firstName,
    handleFirstNameChange,
    lastName,
    handleLastNameChange,
    email,
    handleEmailChange,
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
