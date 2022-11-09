import Cookies from "js-cookie";

const CookiesHelper = {
  get: (key = "") => {
    return Cookies.get(key);
  },
  set: (key = "", value = "", options = {}) => {
    Cookies.set(key, value, options);
  },
  remove: (key = "") => {
    Cookies.remove(key);
    return;
  },
};

export default CookiesHelper;
