import request from "./requset";

export const sendCodeApi = (data) => {
    return request.post("/api/send_code", data);
};

export const compareCodeApi = (data) => {
    return request.post("/api/compare_code", data);
};
