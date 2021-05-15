import request from "./request";

export function assignExam(query, tea_id, exam_id, content) {
  return request({
    url: "/assignExam",
    data: {
      query,
      tea_id,
      exam_id,
      content,
    },
    method: "post",
  });
}

export function queryAssignExam(query) {
  return request({
    url: "/queryAssignExam",
    data: {
      query,
    },
    method: "post",
  });
}
