import React from 'react'
import { Button } from 'reactstrap'
import CampaignModal from '../../Modals/CampaignModal'
import DeleteCampaignModal from '../../Modals/DeleteCampaignModal'

export default function DeleteButton (props) {
  const campaignId = props.campaign_id
  return (
    <>
      <Button color="danger" onClick={props.toggle} block
              className="campaign-delete-btn">Delete Campaign</Button>
      <CampaignModal render={campaignId => (
        <DeleteCampaignModal campaign_id={campaignId} switch={props.toggle}/>)}
                     open={props.modal_open} campaign_id={campaignId}
                     switch={props.toggle}/>
    </>
  )
}