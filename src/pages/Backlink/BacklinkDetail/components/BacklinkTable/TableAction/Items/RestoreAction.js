import React from 'react'
import ActionTooltip from '../ActionTooltip'
import ActionModal from '../../../Modal/ActionModal'

function RestoreAction (props) {
  const [modal, setModal] = React.useState(false)
  return (
    <>
      <ActionTooltip {...props} tooltip_type='restore' test_note='Restore'>
        <a href="/#" className="action-icon text-success" onClick={(e) => {
          e.preventDefault()
          setModal(true)
        }}>
          <i className="mdi mdi-restore"></i>
        </a>
      </ActionTooltip>

      <ActionModal actionType='restoreBacklink' actionParams={{backlinkId: props.test_id}}
                   actionScope='single' open={modal} switch={() => setModal(((prevOpen) => !prevOpen))}
                   actionName='Restore' modalHeader='Restore Backlink' modalTitle='Do you want to restore backlink?'/>
    </>
  )
}

export default RestoreAction