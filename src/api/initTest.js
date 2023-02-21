import request from '@/utils/request'

export function testInit(data) {
  return request({
    url: '/queryStudentInfo',
    method: 'post',
    data
  })
}
