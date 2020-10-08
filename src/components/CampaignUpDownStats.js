import React from 'react'
import { useUser } from '../context/user-context'
import DataComponent from './DataComponent'
import { getCampaignUpDownStats } from '../utils/campaign-client'

function CampaignUpDownStats (props) {
  let currentPeriod = props.upDownPeriod
  const user = useUser()
  return <DataComponent fetchFn={getCampaignUpDownStats} args={{
    'userId': user.id,
    'campaignId': props.campaign_id,
    'currentPeriod': currentPeriod,
    'watch': currentPeriod
  }} render={data => props.render(data)}/>
}

export default CampaignUpDownStats