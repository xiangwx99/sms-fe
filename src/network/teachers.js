import request from './request'

export function loginTeacher(phoneNumber, password) {
  return request({
    url: '/loginTea',
    data: {
      phoneNumber,
      password
    },
    method: 'post'
  })
}

export function addTeacher(phoneNumber, password) {
  return request({
    url: '/addTeacher',
    data: {
      phoneNumber,
      password
    },
    method: 'post'
  })
}