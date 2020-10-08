import React from 'react'
import { ModalBody, ModalHeader } from 'reactstrap'
import BacklinkForm from './../Form/BacklinkForm'

function AddBacklinkModal (props) {
  return (
    <>
      <ModalHeader className={'modal-header modal-colored-header bg-primary'}>Track New Backlink</ModalHeader>
      <ModalBody>
        <BacklinkForm {...props} formType='add' modalSwitch={props.switch}/>
      </ModalBody>
    </>
  )
}

export default AddBacklinkModal