import request from "./requset";
// 获取用户信息
export const getUserInfo = () => {
  return request.get("/users/getUserInfo");
};
// 更新用户信息
export const updataUserInfo = (data) => {
  return request.post("/users/updataUserInfo", data)
}
// 绑定手机号
export const bindMobileApi = (data) => {
  return request.post("/users/bindMobile", data)
}