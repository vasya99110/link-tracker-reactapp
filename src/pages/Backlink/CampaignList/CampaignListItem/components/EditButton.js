import React from 'react'
import { Button } from 'reactstrap'
import EditCampaignModal from '../../Modals/EditCampaignModal'
import CampaignModal from '../../Modals/CampaignModal'

function EditButton (props) {
  const campaignId = props.campaign_id
  return (
    <>
      <Button color="primary" onClick={props.toggle} className="campaign-edit-btn" block>Edit
        Campaign</Button>
      <CampaignModal render={campaignId => (<EditCampaignModal campaign_id={campaignId} switch={props.toggle}/>)}
                     open={props.modal_open} campaign_id={campaignId} switch={props.toggle}/>
    </>
  )
}

export default EditButton