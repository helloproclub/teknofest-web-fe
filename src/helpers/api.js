import axios from "axios";

const BASE_URL = 'https://apiteknofest.proclub.tech';

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

instance.interceptors.request.use(
  (request) => {
    // loading progress goes here
    return request;
  },
  (error) => {
    // error handling goes here
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // success response goes here
    return response;
  },
  (error) => {
    if (error.hasOwnProperty("response")) {
      if (error.response) {
        if (error.response.status === 401) {
          // toast.error('Unauthorized, please login');
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
