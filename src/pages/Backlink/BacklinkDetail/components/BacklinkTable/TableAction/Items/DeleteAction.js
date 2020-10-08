import React from 'react'
import ActionTooltip from '../ActionTooltip'
import ActionModal from '../../../Modal/ActionModal'

function DeleteAction (props) {
  const [modal, setModal] = React.useState(false)
  return (
    <>
      <ActionTooltip {...props} tooltip_type='delete' test_note='Delete'>
        <a href="/#" className="action-icon text-danger" onClick={(e) => {
          e.preventDefault()
          setModal(true)
        }}>
          <i className="mdi mdi-delete"></i>
        </a>
      </ActionTooltip>

      <ActionModal actionType='deleteBacklink' actionParams={{backlinkId: props.test_id}}
                   actionScope='single' open={modal} switch={() => setModal(((prevOpen) => !prevOpen))}
                   actionName='Delete' modalHeader='Delete Backlink' modalTitle='Do you want to delete backlink?'/>
    </>
  )
}

export default DeleteAction