import React from 'react'
import ActionTooltip from '../ActionTooltip'
import EditBacklinkModal from '../../../Modal/EditBacklinkModal'

function EditAction (props) {
  const [modal, setModal] = React.useState(false)

  function switchModal(){
    return setModal(((prevOpen) => !prevOpen))
  }

  return (
    <>
      <ActionTooltip {...props} tooltip_type='edit' test_note='Edit'>
        <a href="/#" className="action-icon text-info"> <i
          className="mdi mdi-pencil" onClick={(e) => {e.preventDefault(); switchModal()}}></i></a>
      </ActionTooltip>
      <EditBacklinkModal test_id={props.test_id} open={modal}
                         switch={switchModal}/>
    </>
  )
}

export default EditAction