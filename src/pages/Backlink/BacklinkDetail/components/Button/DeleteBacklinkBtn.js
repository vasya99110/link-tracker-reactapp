import React from 'react'
import ActionModal from '../Modal/ActionModal'

export default function DeleteBacklinkBtn({ selected_ids, handleModal }) {
  const [deleteModal, setDeleteModal] = React.useState(false)
  return <>
    <button type="button" className="btn btn-danger"
            onClick={(e) => handleModal(selected_ids, setDeleteModal)}>
      <i className="mdi mdi-trash-can mr-1"></i><span>Delete</span></button>

    <ActionModal actionType='deleteBacklink'
                 actionParams={{ backlinkIds: selected_ids }}
                 actionScope='multiple' open={deleteModal}
                 switch={() => setDeleteModal(((prevOpen) => !prevOpen))}
                 actionName='Delete' modalHeader='Delete Backlinks'
                 modalTitle='Do you want to delete these backlinks?'/>
  </>
}