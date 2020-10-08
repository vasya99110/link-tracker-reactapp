import * as API from './API'

export async function getGlobalChartData ({ userId, type }) {
  const list = await API.get(
    `api/backlink-performance-list/${userId}?getType=${type}`)
  return list.data
}

export async function getRegionList () {
  try {
    const list = await API.get('api/backlinks/regions')
    return list.data
  } catch (e) {
    console.dir(e)
  }
}

export async function getLanguageList ({ region }) {
  try {
    const list = await API.get('api/backlinks/languages',
      { params: { region: region } })
    return list.data
  } catch (e) {
    console.dir(e)
    throw new Error(e.toString())
  }
}

export async function getCountryList ({ region }) {
  try {
    const countries = await API.get(`api/backlinks/countries/${region}`)
    return countries.data
  } catch (e) {
    console.dir(e)
    throw new Error(e.toString())
  }
}

export function getLocations ({ countryIsoCode, search }) {
  /*try {
    const locations = await API.get(`api/backlinks/locations/${countryIsoCode}`, {params: {search: search}})
    return locations.data
  } catch (e) {
    console.dir(e)
    throw new Error(e.toString())
  }*/

  return API.get(
    `api/backlinks/locations/${countryIsoCode}`,
    { params: { search: search }, timeout: 0 }).then(response => response.data)
}

export function getBacklinkById (backlinkId) {
  return API.get(`api/backlinks/${backlinkId}`)
}

export async function getBacklinkList ({ userId, campaignId, groupId, backlinkStatus, start, end, sortDir, sortField, searchTerm }) {
  try {
    const list = await API.get(
      'api/backlinks',
      {
        params: {
          searchTerm: searchTerm,
          user_id: userId,
          campaign_id: campaignId,
          group_id: groupId,
          backlink_status: backlinkStatus,
          offset: start,
          to: end,
          sortField: sortField,
          sortDir: sortDir,
        }
      })
    return list.data
  } catch (error) {
    console.dir(error)
  }
}

export function createBacklink (data) {
  return API.post('api/backlinks', data)
}

export function editBacklink (data) {
  return API.put(`api/backlinks/${data.test_id}`, data)
}

export function deleteBacklink ({ backlinkId, forceDelete = false }) {
  return API.deleteRequest(`api/backlinks/${backlinkId}`,
    { params: { forceDelete: forceDelete } })
}

export function deleteMultipleBacklinks ({ backlinkIds, forceDelete = false }) {
  return API.post('api/backlinks/multiple-delete',
    { 'deleteIds': backlinkIds, forceDelete: forceDelete })
}

export function restoreBacklink ({ backlinkId }) {
  return API.patch(`api/backlinks/restore/${backlinkId}`)
}

export function restoreMultipleBacklink ({ backlinkIds }) {
  return API.post('api/backlinks/multiple-restore',
    { 'restoreIds': backlinkIds })
}

export function archiveMultipleBacklinks ({ backlinkIds }) {
  return API.post('api/backlinks/multiple-archive',
    { 'archiveIds': backlinkIds })
}

export async function archiveBacklink ({ backlinkId }) {
  return API.patch(`api/backlinks/archive/${backlinkId}`)
}

export function getBacklinkDataSummary ({ backlinkId }) {
  return API.get(`api/backlinks/data-summary/${backlinkId}`)
}

export async function getBacklinkHeader ({ testId }) {
  try {
    return await API.get('api/backlink-chart-header/' + testId)
  } catch (error) {
    console.dir(error)
    throw error
  }
}