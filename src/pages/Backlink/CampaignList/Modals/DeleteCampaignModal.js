import React from 'react'
import { Button, ModalBody, ModalHeader } from 'reactstrap'
import { deleteCampaign } from '../../../../utils/campaign-client'
import { useCampaignListValue } from '../campaign-list-context'

function DeleteCampaignModal (props) {
  const [, dispatch] = useCampaignListValue()

  function doDelete (campaignId) {
    deleteCampaign(campaignId).then(function (response) {
      dispatch({
        'type': 'campaignListChange',
        'campaignListCount': response.data.meta.campaign_id,
      })
    }).catch(function (error) {
      if (error.response) {
        const errorData = error.response.data,
          errorFields = errorData.errors
        alert(errorFields.campaign_name[0])
      } else {
        console.dir(error)
      }
    })
  }

  return (
    <>
      <ModalHeader>Do you want to delete this campaign?</ModalHeader>
      <ModalBody>
        <Button color="danger" onClick={(e) => doDelete(props.campaign_id, e)}>Delete</Button> {' '}
        <Button color="secondary" onClick={props.switch}>Cancel</Button>
      </ModalBody>
    </>
  )
}

export default DeleteCampaignModal