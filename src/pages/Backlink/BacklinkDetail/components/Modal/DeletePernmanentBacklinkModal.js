import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { deleteBacklink } from './../../../../../utils/backlink-client'
import { useCampaignDetailValue } from '../../campaign-detail-context'

function DeletePernmanentBacklinkModal (props) {
  const [{fetchCount}, dispatch] = useCampaignDetailValue()

  function doDeletePermanent(test_id, e) {
    e.preventDefault();

    deleteBacklink(test_id, true).then(response => {
      dispatch({'type': 'updateFetchCount', 'fetchCount': fetchCount + 1})
      alert(response.data.success.message)
      props.switch()
    }).catch(error => {
      console.dir(error)
      alert('Backlink delete error. Please contact administrator')
    })
  }

  return (
    <Modal isOpen={props.open} toggle={props.switch} unmountOnClose={false}
           className={props.className}>
      <ModalHeader className={'modal-header modal-colored-header bg-primary'}>Delete Backlink</ModalHeader>
      <ModalBody>
        <h3>Do you want to delete this test?</h3>
        <div className='button-list'>
          <button type="button" className="btn btn-danger" onClick={(e) => doDeletePermanent(props.test_id, e)}>Delete</button>
          <button type="button" className="btn btn-light" onClick={props.switch}>Cancel</button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default DeletePernmanentBacklinkModal