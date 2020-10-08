import React from 'react'
import { ModalBody, ModalHeader } from 'reactstrap'
import AddGroupForm from '../Form/AddGroupForm'

export default function AddGroupModal (props) {
  return (
    <>
      <ModalHeader className={'modal-header modal-colored-header bg-primary'}>
        Add Group
      </ModalHeader>
      <ModalBody>
        <AddGroupForm modal_switch={props.switch}/>
      </ModalBody>
    </>
  )
}