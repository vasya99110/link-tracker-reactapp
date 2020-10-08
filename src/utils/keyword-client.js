import * as API from './API'

export function deleteKeyword (keywordId) {
  return API.deleteRequest(`api/keywords/${keywordId}`)
}

export function getChartData ({keywordId, period}) {
  return API.get(`api/keywords/chart-data/${keywordId}?period=${period}`)
}

export function getKeywordSummary ({keywordId}) {
  return API.get(`api/keywords/data-summary/${keywordId}`)
}

export function addKeywords(data){
  return API.post('api/keywords', data)
}

export function getKeywordTrendPeriod ({userId}) {
  return API.get(`api/keywords/updown-report-period/${userId}`)
}

export function saveKeywordTrendPeriod (data) {
  return API.post('api/keywords/updown-report-period', data)
}

export function getKeywordDropOptions ({userId}) {
  return API.get(`api/keywords/ranking-drop-option/${userId}`)
}

export function saveKeywordOption (data) {
  return API.post('api/keywords/ranking-drop-option', data)
}