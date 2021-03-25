import request from "./request";

export function uploadFiles(data) {
  return request({
    url: "/uploadImg",
    headers: { "Content-Type": "multipart/form-data" },
    data: data,
    method: "post",
  });
}
