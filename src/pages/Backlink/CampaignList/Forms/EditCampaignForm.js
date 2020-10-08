import React from 'react'
import CampaignForm from './CampaignForm'
import { useCampaignItemValue } from '../CampaignListItem/campaign-item-context'

export default function EditCampaignForm (props) {
  const editContext = useCampaignItemValue()
  return (
    <CampaignForm switch={props.switch} type='edit' {...editContext}>
      <input type="hidden" name="type" value="edit"/>
    </CampaignForm>
  )
}
