import request from "./requset";

// 获取活动列表
export const getActiveListApi = (query = {}) => {
  return request.get("/api/getActivityList", { params: query });
};

// 发布活动
export const createActiveApi = (data) => {
  return request.post("/active/createActivity", data);
};

// 编辑活动
export const updateActiveApi = (activeid, data) => {
  return request.post(`/active/updataActivityInfo1${activeid}`, data);
};

// 收藏活动
export const collectActive = (iscollect, data) => {
  return request.post(`/active/collectActive${iscollect}`,
    data);
};

// 获取我的收藏
export const getcollectActiveList = () => {
  return request.get("/active/getMyCollectActivityList");
};

// 获取我的活动
export const getMyActiveList = () => {
  return request.get("/active/getMyActivityList");
};


// 删除活动
export const delActive = (data) => {
  return request.post(`/active/delActive`,
    data);
};

// 获取推荐活动
export const getcommandActiveList = () => {
  return request.get("/api/getcommandActiveList");
};