import * as API from './API'

export async function getGroupById ({groupId = 0}) {
  try {
    const group = await API.get(`api/groups/${groupId}`)
    return group.data
  } catch (error) {
    console.dir(error)
  }
}

export function getGroups ({ campaignId = 0, userId = 0 }) {
  return API.get('api/groups', {
    params: { user_id: userId, campaign_id: campaignId },
  }).then(res => res.data).catch(error => console.dir(error))
}

export function updateGroupListState ({campaignId, userId, dispatchFn, switchFn, submittingFn}) {
  getGroups({ campaignId: campaignId, userId: userId })
    .then(response => {
      dispatchFn({ type: 'updateGroupList', groupList: response.data })
      switchFn()
      submittingFn(false)
    })
}

export function createGroup (data) {
  return API.post('api/groups', data)
}

export function updateGroup (data) {
  return API.patch(`api/groups/${data.id}`, data )
}

export function deleteGroup (id) {
  return API.deleteRequest(`api/groups/${id}`)
}