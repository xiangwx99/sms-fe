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

export function queryStudent(queryArgs) {
  return request({
    url: "/queryStudent",
    data: {
      queryArgs,
    },
    method: "post",
  });
}

export function queryStudentById(_id) {
  return request({
    url: "/queryStudentById",
    data: {
      _id,
    },
    method: "post",
  });
}

export function deleteStudent(id) {
  return request({
    url: "/deleteStudent",
    data: {
      id,
    },
    method: "post",
  });
}

export function updateStudentInfo(stuInfo) {
  return request({
    url: "/updateStudentInfo",
    data: {
      stuInfo,
    },
    method: "post",
  });
}

export function resetStudentPassword(_id, oldpassword, newpassword) {
  return request({
    url: "/resetStudentPassword",
    data: {
      _id,
      oldpassword,
      newpassword,
    },
    method: "post",
  });
}
