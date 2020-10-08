import React from 'react'
import { Button } from 'reactstrap'
import BacklinkModal from '../BacklinkModal'

export default function BacklinkButton (props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const toggleModal = () => setModalOpen(!modalOpen)

  return (
    <>
      <Button onClick={toggleModal} color={props.color}>{props.children}</Button>
      <BacklinkModal open={modalOpen} switch={toggleModal} {...props}>
        {props.modal_render({toggleModal})}
      </BacklinkModal>
    </>
  )
}