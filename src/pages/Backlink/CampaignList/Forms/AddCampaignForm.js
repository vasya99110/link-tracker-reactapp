import React from 'react'
import CampaignForm from './CampaignForm'

export default function AddCampaignForm (props) {
  return (
    <CampaignForm switch={props.switch} type='add'>
      <input type="hidden" name="type" value="add"/>
    </CampaignForm>
  )
}
