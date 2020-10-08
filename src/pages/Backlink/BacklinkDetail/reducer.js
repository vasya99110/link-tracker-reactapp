function reducer(states, action){
  const type = action.type
  if (type === 'updateCampaignId') {
    return {
      ...states,
      campaignId: action.campaignId
    }
  }
  else if (type === 'updateGroupList') {
    return {
      ...states,
      groupList: action.groupList
    }
  }
  else if(type === 'updateCurrentGroup') {
    return {
      ...states,
      currentGroupId: action.currentGroupId
    }
  }
  else if (type === 'changeUpDownStats') {
    return {
      ...states,
      currentPeriod: action.currentPeriod
    }
  }
  else if (type === 'updateBacklinkStatus') {
    return {
      ...states,
      backlinkStatus: action.backlinkStatus
    }
  }
  else if (type === 'updateFetchCount') {
    return {
      ...states,
      fetchCount: action.fetchCount
    }
  }
  else if (type === 'updatePageSize') {
    return {
      ...states,
      savedPageSize: action.savedPageSize
    }
  }
  else { return states }
}

export default reducer