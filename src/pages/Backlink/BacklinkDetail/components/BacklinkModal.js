import React from 'react'
import { Modal } from 'reactstrap'

function BacklinkModal (props) {
  return (
    <Modal isOpen={props.open} toggle={props.switch} unmountOnClose={false}
           className={props.className} size={props.size}>
      {props.children}
    </Modal>
  )
}

export default BacklinkModal