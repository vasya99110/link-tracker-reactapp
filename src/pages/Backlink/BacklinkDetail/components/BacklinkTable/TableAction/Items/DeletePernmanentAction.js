import React from 'react'
import ActionTooltip from '../ActionTooltip'
import ActionModal from '../../../Modal/ActionModal'

function DeletePernmanentAction (props) {
  const [modal, setModal] = React.useState(false)
  return (
    <>
      <ActionTooltip {...props} tooltip_type='delete_permanent' test_note='Delete Permanently'>
        <a href="/#" className="action-icon text-danger" onClick={(e) => {
          e.preventDefault()
          setModal(true)
        }}>
          <i className="mdi mdi-delete-forever"></i>
        </a>
      </ActionTooltip>

      <ActionModal actionType='deleteBacklink' actionParams={{backlinkId: props.test_id, forceDelete: true}}
                   actionScope='single' open={modal} switch={() => setModal(((prevOpen) => !prevOpen))}
                   actionName='Delete' modalHeader='Delete Backlink Permanent' modalTitle='Do you want to delete backlink permanently?'/>

    </>
  )
}

export default DeletePernmanentAction