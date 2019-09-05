import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/machine/list',
    method: 'get',
    params: query
  })
}

export function submitPeopleInChargeAPI(data) {
  return request({
    url: '/machine/submitPeopleInCharge',
    method: 'post',
    data
  })
}

export function fetchMachine(id) {
  return request({
    url: '/machine/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/machine/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/machine/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/machine/update',
    method: 'post',
    data
  })
}
