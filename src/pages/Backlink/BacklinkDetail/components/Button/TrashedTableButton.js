import React from 'react'
import ActionModal from '../Modal/ActionModal'
import RestoreActionButton from './components/RestoreActionButton'

function ActiveTableButton ({ selected_ids, handleModal }) {
  const [deleteModal, setDeleteModal] = React.useState(false)
  return (
    <>
      <RestoreActionButton selected_ids={selected_ids} handleModal={handleModal}/>

      <button type="button" className="btn btn-danger" onClick={(e) => handleModal(selected_ids, setDeleteModal)}><i
        className="mdi mdi-archive mr-1"></i><span>Delete Permanently</span>
      </button>
      <ActionModal actionType='deleteBacklink'
                   actionParams={{ backlinkIds: selected_ids, forceDelete: true }}
                   actionScope='multiple' open={deleteModal}
                   switch={() => setDeleteModal(((prevOpen) => !prevOpen))}
                   actionName='Delete Permanent' modalHeader='Delete Backlinks Permanently'
                   modalTitle='Do you want to restore these backlinks permanently?'/>
    </>
  )
}

export default ActiveTableButton