import request from "./requset";

export const getLoginApi = (userInfo) => {
  return request.post("/api/login", userInfo);
};

export const getRegisterApi = (userInfo) => {
  return request.post("/api/register", userInfo);
};

export const resetpwdApi = (flag, data) => {
  return request.post(`/api/resetpwd${flag}`, data);
};
