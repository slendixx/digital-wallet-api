import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useRequestAPI from "./useRequestAPI";
import {
  validateEmail,
  validatePassword,
} from "../validation/validateUserData";
import useSession from "../session/useSession";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setformSubmitted] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const { sendRequest } = useRequestAPI();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { createSession } = useSession();

  //this state is passed from the SignupForm view
  useEffect(() => {
    if (state?.accountCreated) setAccountCreated(true);
  }, [state?.accountCreated]);
  //this state is passed from the ChangePasswordForm view
  useEffect(() => {
    if (state?.passwordChanged) setPasswordChanged(true);
  }, [state?.passwordChanged]);

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

  const resolveHandler = async (response) => {
    setUnauthorized(false);
    setformSubmitted(false);
    setValidationError(false);
    await createSession(response.data.userId);
    navigate("/account", { replace: true });
  };
  const rejectHandler = () => {
    setUnauthorized(true);
    setformSubmitted(false);
    setValidationError(false);
  };

  useEffect(() => {
    if (!formSubmitted) return;
    sendRequest({
      method: "post",
      url: "/auth/login",
      data: { email, password },
      resolveHandler,
      rejectHandler,
    });
    setUnauthorized(false);
    setformSubmitted(false);
    setValidationError(false);
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
    accountCreated,
    passwordChanged,
  };
};

export default useLoginForm;
