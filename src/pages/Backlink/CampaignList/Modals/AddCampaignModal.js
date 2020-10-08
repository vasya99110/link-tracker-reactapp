import React from 'react'
import { ModalBody, ModalHeader } from 'reactstrap'
import AddCampaignForm from './../Forms/AddCampaignForm'

function AddCampaignModal (props) {
  return (
    <>
      <ModalHeader>Add Campaign</ModalHeader>
      <ModalBody>
          <AddCampaignForm switch={props.switch}/>
      </ModalBody>
    </>
  )
}

export default AddCampaignModal