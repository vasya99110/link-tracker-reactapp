import React from 'react'
import { ModalBody, ModalHeader } from 'reactstrap'
import EditGroupForm from '../Form/EditGroupForm'

export default function EditGroupModal (props) {
  return (
    <>
      <ModalHeader className={'modal-header modal-colored-header bg-primary'}>
        Edit Group
      </ModalHeader>
      <ModalBody>
        <EditGroupForm {...props}/>
      </ModalBody>
    </>
  )
}