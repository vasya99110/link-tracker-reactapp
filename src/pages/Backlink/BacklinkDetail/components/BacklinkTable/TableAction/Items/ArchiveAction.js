import React from 'react'
import ActionTooltip from '../ActionTooltip'
import ActionModal from '../../../Modal/ActionModal'

function ArchiveAction (props) {
  const [modal, setModal] = React.useState(false)
  return (
    <>
      <ActionTooltip {...props} tooltip_type='archive' test_note='Archive'>
        <a href="/#" className="action-icon text-warning" onClick={(e) => {
          e.preventDefault()
          setModal(true)
        }}>
          <i className="mdi mdi-archive"></i>
        </a>
      </ActionTooltip>

      <ActionModal actionType='archiveBacklink' actionParams={{backlinkId: props.test_id}}
                   actionScope='single' open={modal} switch={() => setModal(((prevOpen) => !prevOpen))}
                   actionName='Archive' modalHeader='Archive Backlink' modalTitle='Do you want to archive backlink?'/>
    </>
  )
}

export default ArchiveAction