import React from 'react'
import { useCampaignListValue } from './../../campaign-list-context'
import CampaignUpDownButtons
  from '../../../../../components/CampaignUpDownButtons'

function UpDownButton(){
  const [{ currentPeriod }, dispatch] = useCampaignListValue()
  return <CampaignUpDownButtons currentPeriod={currentPeriod} dispatchFn={dispatch}/>
}

export default UpDownButton