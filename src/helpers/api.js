import axios from "axios";

import CookiesHelper from "./cookies-helper";

const BASE_URL = 'http://apiteknofest.proclub.tech';
const token = CookiesHelper.get("teknoFest_accessToken");

const instance = axios.create({
    baseURL: BASE_URL,
});

// instance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// instance.defaults.headers.post["Access-Control-Allow-Methods"] = 
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS";
// instance.defaults.headers.post["Access-Control-Allow-Credentials"] = "true";
// instance.defaults.headers.post["Access-Control-Allow-Headers"] =
//     "Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Requested-With";
// instance.defaults.headers.post["Access-Control-Max-Age"] = "86400";
// instance.defaults.headers.post["Content-Type"] = "application/json";

if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

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
            // logout
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
