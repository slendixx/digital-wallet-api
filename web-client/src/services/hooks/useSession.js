import { useNavigate } from "react-router-dom";
import useRequestAPI from "../hooks/useRequestAPI";
const useSession = () => {
  const navigate = useNavigate();
  const { sendRequest } = useRequestAPI();

  const checkSession = () => {
    const session = localStorage.getItem("session");
    if (!session) navigate("/login", { replace: true });
  };

  const handleCreateSessionResolve = (response) => {
    const userData = {
      id: response.data.results[0].data,
      lastName: response.data.results[0].last_name,
      firstName: response.data.results[0].first_name,
    };

    localStorage.setItem("session", JSON.stringify(userData));
  };
  const handleCreateSessionReject = (response) => {
    console.log(response.response);
  };

  const createSession = async (userId) => {
    const response = await sendRequest({
      method: "get",
      url: "/users/" + userId,
      resolveHandler: handleCreateSessionResolve,
      rejectHandler: handleCreateSessionReject,
    });
    console.log(response);
  };
  const getSessionData = () => {
    return JSON.parse(localStorage.getItem("session"));
  };
  //TODO handleUnauthorized
  const handleUnauthorized = (error) => {
    console.log("401 handler: ", error);
  };

  return {
    checkSession,
    createSession,
    getSessionData,
    handleUnauthorized,
  };
};

export default useSession;
