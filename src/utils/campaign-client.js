import * as API from './API'

export async function fetchCampaignList () {
  try {
    const campaigns = await API.get('api/campaigns'),
      campaignResponseData = campaigns.data
    return campaignResponseData.data
  } catch (error) {
    console.dir(error)
  }
}

export async function getCampaignDetail ({ campaignId }) {
  try {
    const campaign = await API.get('api/campaigns/' + campaignId)
    return campaign.data
  } catch (error) {
    console.dir(error)
  }
}

export async function getCampaignUpDownStats ({ campaignId, userId, currentPeriod = 'day' }) {
  try {
    const stats = await API.get(
      'api/backlink-updown-count/' + userId,
      {
        'params': { 'campaign_id': campaignId, 'period': currentPeriod },
      },
    )
    return stats.data
  } catch (e) {
    console.dir(e.toString())
  }
}

export async function getCampaignItemToxicityStatus ({ campaignId, currentPeriod }) {
  try {
    const status = await API.get(
      'api/campaign-item-stats/' + campaignId,
      {
        "params": {
          currentPeriod: currentPeriod,
        },
      })
    return status.data
  } catch (error) {
    console.dir(error)
  }
}

export function editCampaign (campaignId, data) {
  return API.put('api/campaigns/' + campaignId, data)
}

export function addCampaign (data) {
  return API.post('api/campaigns', data)
}

export function deleteCampaign (campaignId) {
  return API.deleteRequest('api/campaigns/' + campaignId)
}