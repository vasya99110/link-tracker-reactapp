import * as API from './API'

export function getProjectList (data) {
  return API.get('api/projects', { params: data })
}

export function saveProject (data) {
  return API.post('api/projects', data)
}

export function deleteProject (projectId) {
  return API.deleteRequest(`api/projects/${projectId}`)
}

export function getProjectById (projectId) {
  return API.get(`api/projects/${projectId}`)
}

export function editProject (data) {
  return API.put(`api/projects/${data.projectId}`, data)
}

export function getKeywordList (data) {
  return API.get(`api/keywords`, { params: data })
}

export function getPerformanceChartData ({ projectId, chartPeriod }) {
  return API.get(`api/projects/performance-chart/${projectId}?chartPeriod=${chartPeriod}`)
}

export function getNoteList ({ projectId, keywordId }) {
  return API.get(`api/projects/notes`, {
    params: { "projectId": projectId, "keywordId":keywordId }
  })
}

export function getNote ({noteId}) {
  return API.get(`api/projects/notes/${noteId}`)
}

export function addNote (data) {
  return API.post('api/projects/notes', data)
}

export function editNote (data) {
  return API.put(`api/projects/notes/${data.noteId}`, data)
}

export function deleteNote (noteId) {
  return API.deleteRequest(`api/projects/notes/${noteId}`)
}