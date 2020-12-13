import request from './request'

export function loginStudent(phoneNumber, password) {
  return request({
    url: '/login',
    data: {
      phoneNumber,
      password
    },
    method: 'post'
  })
}

export function addStudent(phoneNumber, password) {
  return request({
    url: '/addStudent',
    data: {
      phoneNumber,
      password
    },
    method: 'post'
  })
}