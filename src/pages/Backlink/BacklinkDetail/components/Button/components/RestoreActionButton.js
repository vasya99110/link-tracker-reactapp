import React from 'react'
import ActionModal from '../../Modal/ActionModal'

function RestoreActionButton ({ selected_ids, handleModal }) {
  const [restoreModal, setRestoreModal] = React.useState(false)
  return (
    <>
      <button type="button" className="btn btn-success"
              onClick={(e) => handleModal(selected_ids, setRestoreModal)}>
        <i className="mdi mdi-trash-can mr-1"></i><span>Restore</span></button>
      <ActionModal actionType='restoreBacklink'
                   actionParams={{ backlinkIds: selected_ids }}
                   actionScope='multiple' open={restoreModal}
                   switch={() => setRestoreModal(((prevOpen) => !prevOpen))}
                   actionName='Restore' modalHeader='Restore Backlinks'
                   modalTitle='Do you want to restore these backlinks?'/>
    </>
  )
}

export default RestoreActionButton