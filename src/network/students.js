import request from "./request";

export function loginStudent(phoneNumber, password) {
  return request({
    url: "/login",
    data: {
      phoneNumber,
      password,
    },
    method: "post",
  });
}

export function addStudent(stuInfo) {
  return request({
    url: "/addStudent",
    data: {
      stuInfo,
    },
    method: "post",
  });
}
