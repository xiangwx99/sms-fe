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

export function queryAssignExamById(_id) {
  return request({
    url: "/queryAssignExamById",
    data: {
      _id,
    },
    method: "post",
  });
}