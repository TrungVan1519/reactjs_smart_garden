import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  // Expected (404: Not found, 400: Bad request) - CLIENT ERRORS
  // - Display a specific error message
  if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  ) {
    return Promise.reject(error);
  }

  // Unexpected (Network down, Server down, DB down, bug)
  // - Log them
  // - Display a generic and friendly error message
  console.log("Logging the error", error);
  toast.error("An unexpected error occurred: Network down, Server down, ...");
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
