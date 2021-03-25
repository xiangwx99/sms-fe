import request from "./request";

export function loginTeacher(phoneNumber, password) {
  return request({
    url: "/loginTea",
    data: {
      phoneNumber,
      password,
    },
    method: "post",
  });
}

export function addTeacher(phoneNumber, password) {
  return request({
    url: "/addTeacher",
    data: {
      phoneNumber,
      password,
    },
    method: "post",
  });
}

export function queryTeacherById(_id) {
  return request({
    url: "/queryTeacherById",
    data: {
      _id,
    },
    method: "post",
  });
}
