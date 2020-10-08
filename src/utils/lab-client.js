import * as API from './API'

export function getLabList ({ userId }) {
  return API.get('api/labs', {
    'params': { 'userId': userId },
  })
}

export function getLabKeywords ({ labId }) {
  return API.get(`api/labs/${labId}/keywords`)
}

export function saveLab(data){
  return API.post('api/labs', data)
}