import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function LabModal({render, btnTitle, modalTitle}) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {btnTitle}
      </Button>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        // backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {render({'handleClose': handleClose})}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LabModal