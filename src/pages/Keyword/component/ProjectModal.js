import React from 'react'
import { Modal } from 'react-bootstrap'

function ProjectModal ({showModal, setShowModal, modalId, modalTitle, render, size, className}) {
  return (
    <Modal
      size={size ? size : 'lg'}
      show={showModal}
      onHide={() => setShowModal(false)}
      aria-labelledby={modalId}
      className={className}
    >
      <Modal.Header closeButton>
        <Modal.Title id={modalId}>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {render()}
      </Modal.Body>
    </Modal>
  )
}

export default ProjectModal