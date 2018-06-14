import axios from "axios";
axios.defaults.timeout = 100000;
axios.defaults.baseURL = "http://javaadmin.lebole2.com:8087";
axios.defaults.headers.post["Content-Type"] = "application/json";
// code状态码0判断  0 成功
axios.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);
export default axios;
