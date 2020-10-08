import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'

function ColumnChooserComponent ({ allColumns, toggleHideAllColumns, hiddenColumnsKey }) {
  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return <>
    <Button variant="primary" onClick={handleShow}>
      Customize Columns
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Customize Columns</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            {allColumns.map(column => {
              if (column.id !== 'selection' && column.id !== 'action') {
                return <div key={column.id}
                            className="form-check form-check-inline">
                  <input className='form-check-input'
                         type="checkbox" {...column.getToggleHiddenProps()}/>
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    {column.Header ? column.Header : ''}</label>
                </div>
              }
              return ''
            })}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='info' onClick={() => {
          toggleHideAllColumns(false)
          window.localStorage.removeItem(hiddenColumnsKey)
        }}>
          Reset</Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

export default ColumnChooserComponent