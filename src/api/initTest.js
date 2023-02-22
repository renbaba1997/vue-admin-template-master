import request from '@/utils/request'

export function testInit(data) {
  return request({
    url: '/queryStudentInfo',
    method: 'post',
    data
  })
}

export function addStudentInfo(data) {
  return request({
    url: '/addStudentInfo',
    method: 'post',
    data
  })
}

export function deleteStudentInfo(data) {
  return request({
    url: '/deleteStudentInfo',
    method: 'post',
    data
  })
}

export function deleteStudentInfos(data) {
  return request({
    url: '/deleteStudentInfos',
    method: 'post',
    data
  })
}