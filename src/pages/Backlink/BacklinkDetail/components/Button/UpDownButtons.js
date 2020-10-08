import React from 'react'
import { useCampaignDetailValue } from '../../campaign-detail-context'
import CampaignUpDownButtons
  from '../../../../../components/CampaignUpDownButtons'

function UpDownButton () {
  const [{ currentPeriod }, dispatch] = useCampaignDetailValue()
  return <CampaignUpDownButtons currentPeriod={currentPeriod}
                                dispatchFn={dispatch}/>
}

export default UpDownButton