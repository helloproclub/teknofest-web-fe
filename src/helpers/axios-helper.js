import axios from "./api";

const AxiosHelper = {
  setHeader: (key = "", headerType = "common", value = "") => {
    axios.defaults.headers[headerType][key] = value;
    return;
  },
  removeHeader: (key = "", headerType = "common") => {
    delete axios.defaults.headers[headerType][key];
    return;
  },
};

export default AxiosHelper;
