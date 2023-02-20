import request from '@/utils/request'

export function testInit(data) {
  return request({
    url: '/api',
    method: 'post',
    data
  })
}
