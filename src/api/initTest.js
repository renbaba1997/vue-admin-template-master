import request from '@/utils/request'
import exportExcel from '@/api/exportExcel'
import qs from 'qs'

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

export function downloadTemplate(data) {
  return exportExcel({
    url: '/downloadTemplate',
    responseType: 'blob',
    method: 'get'
  })
}

export function downloadTable(params) {
  return exportExcel({
    url: '/downloadTable?' + qs.stringify(params, { arrayFormat: 'repeat' }),
    responseType: 'blob',
    method: 'get'
  })
}
