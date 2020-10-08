import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import BacklinkForm from '../Form/BacklinkForm'

function EditBacklinkModal(props){
  return (
    <Modal isOpen={props.open} toggle={props.switch} unmountOnClose={false}
           className={props.className} size='lg'>
      <ModalHeader className={'modal-header modal-colored-header bg-primary'}>Edit Backlink</ModalHeader>
      <ModalBody>
        <BacklinkForm modalSwitch={props.switch} formType='edit' testId={props.test_id}/>
      </ModalBody>
    </Modal>
  )
}

export default EditBacklinkModal