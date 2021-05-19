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

export function updateAssignExamById(id, status, content) {
  return request({
    url: "/updateAssignExamById",
    data: {
      id,
      status,
      content,
    },
    method: "post",
  });
}

export function queryAssignExamByTeaId(id) {
  return request({
    url: "/queryAssignExamByTeaId",
    data: {
      id,
    },
    method: "post",
  });
}

export function queryAssignExamByCondition(id, examName, major) {
  return request({
    url: "/queryByCondition",
    data: {
      id,
      examName,
      major,
    },
    method: "post",
  });
}
