import React, {useState} from 'react'

function ModalButton(props) {
  const [modalOpen, setModalOpen] = useState(false)

  function toggleModal(){
    setModalOpen(preModalOpen => !preModalOpen)
  }

  return (
    <>
      {props.render(toggleModal, modalOpen, props)}
    </>
  )
}

export default ModalButton