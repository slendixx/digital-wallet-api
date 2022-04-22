import axios from "axios";
const APIHost = "http://127.0.0.1:3000/api/v1";

const useRequestAPI = () => {
  /**
   * @description Perform an AJAX request to the App's API
   * @param {Object} config
   */
  const sendRequest = ({
    method = "get",
    url = "",
    data = {},
    headers = {},
    withCredentials = true,
    resolveHandler,
    rejectHandler,
  }) => {
    axios({ method, data, headers, url: APIHost + url })
      .then(resolveHandler)
      .catch(rejectHandler);
  };

  return {
    sendRequest,
  };
};
export default useRequestAPI;
