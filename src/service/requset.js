import axios from "axios";
import store from "../store";
import { Message } from "element-ui";
const baseUrl = "http://localhost:3000";

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 8000,
});

// const isLoading = false;

instance.interceptors.request.use(
  function (config) {
    let token = localStorage.getItem("TOKEN");
    if (token) {
      config.headers.Authorization = ` Bearer <${token}>`;
    }
    store.state.loading = true;
    // 在请求之前做什么
    return config;
  },
  function (err) {
    // 对请求错误做啥
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  function (response) {
    store.state.loading = false;
    if (response.data.status === 405) {
      localStorage.removeItem("TOKEN");
      store.dispatch("checkToken");
    }
    return response.data;
  },
  function (err) {
    // 对请求错误做啥
    if (err.response.status === 404) {
      Message.error("404 NOT FOUND!")
    }
    return Promise.reject(err);
  }
);

export default instance;
