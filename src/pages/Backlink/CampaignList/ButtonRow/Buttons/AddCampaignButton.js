import React from 'react'
import { Button } from 'reactstrap'
import AddCampaignModal from '../../Modals/AddCampaignModal'
import CampaignModal from '../../Modals/CampaignModal'

function AddCampaignButton (props) {
  return (
    <>
      <Button color="primary" onClick={props.toggle} className="campaign-edit-btn"><i
        className="mdi mdi-plus"></i> Add
        Campaign</Button>
      <CampaignModal render={() => (<AddCampaignModal switch={props.toggle}/>)}
                     open={props.modal_open} switch={props.toggle}/>
    </>
  )
}

export default AddCampaignButton