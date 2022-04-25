import axios from "axios";
const APIHost = "http://localhost:3000/api/v1";

const useRequestAPI = () => {
  /**
   * @description Perform an AJAX request to the App's API. If no resolve & reject handlers are provided, returns a promise to be handled
   *
   * @param {Object} config
   */
  const sendRequest = ({
    method = "get",
    url = "",
    data = {},
    headers = { crossDomain: true },
    withCredentials = true,
    resolveHandler,
    rejectHandler,
  }) => {
    if (!rejectHandler && !resolveHandler)
      return axios({
        method,
        data,
        headers,
        url: APIHost + url,
        withCredentials,
      });

    axios({
      method,
      data,
      headers,
      url: APIHost + url,
      withCredentials,
    })
      .then(resolveHandler)
      .catch(rejectHandler);
  };

  return {
    sendRequest,
  };
};
export default useRequestAPI;
