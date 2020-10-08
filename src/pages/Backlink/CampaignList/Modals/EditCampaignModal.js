import React, { Suspense } from 'react'
import { ModalBody, ModalHeader } from 'reactstrap'
import EditCampaignForm from '../Forms/EditCampaignForm'

function EditCampaignModal (props) {
  return (
    <>
      <ModalHeader>Edit Campaign</ModalHeader>
      <ModalBody>
        <Suspense fallback={<div>Loading Form...</div>}>
          <EditCampaignForm campaign_id={props.campaign_id}
                            switch={props.switch}/>
        </Suspense>
      </ModalBody>
    </>
  )
}

export default EditCampaignModal