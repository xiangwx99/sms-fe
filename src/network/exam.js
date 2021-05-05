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

export function queryExam(tea_id) {
  return request({
    url: "/queryExam",
    data: {
      tea_id,
    },
    method: "post",
  });
}

export function deleteExam(_id) {
  return request({
    url: "/deleteExam",
    data: {
      _id,
    },
    method: "post",
  });
}

export function queryExamById(_id) {
  return request({
    url: "/queryExamById",
    data: {
      _id,
    },
    method: "post",
  });
}
