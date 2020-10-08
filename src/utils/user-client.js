import * as API from './API'

export function uploadProfileImage (data) {
  return API.post('api/users/upload-profile-image', data)
}

export function updateProfile (data) {
  return API.put(`api/users/${data.userId}`, data)
}

export function updatePassword (data) {
  return API.patch('api/users/change-pass', data)
}

export function createChargebeePortal (data) {
  return API.post('api/users/create-chargebee-portal-session', data)
}

export function getMozApi ({ userId }) {
  return API.get('api/users/moz-api/' + userId)
}

export function updateMozApi (data) {
  return API.post('api/users/update-moz-api', data)
}

export function getRankingBehaviorSetting ({ userId }) {
  return API.get('api/users/get-ranking-behavior-settings/' + userId)
}

export function updateRankingBehavior (data) {
  return API.post('api/users/update-ranking-behavior-settings', data)
}

export function getArchiveDays ({ userId }) {
  return API.get(`api/users/get-backlink-archive-days/${userId}`)
}

export function updateArchiveDays (data) {
  return API.post('api/users/update-backlink-archive-days', data)
}

export function getCreditStats ({ userId }) {
  return API.get('api/users/get-credit-stats/' + userId)
}

export function getToxicAlert ({userId}) {
  return API.get(`api/users/get-backlinks-toxic-alert/${userId}`)
}

export function updateToxicAlert (data) {
  return API.post('api/users/update-backlink-toxic-alert', data)
}