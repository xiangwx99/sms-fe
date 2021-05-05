import request from "./request";

export function addExam(tea_id, content) {
  return request({
    url: "/addExam",
    data: {
      tea_id,
      content,
    },
    method: "post",
  });
}
