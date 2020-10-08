import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import _lang from 'lodash/lang'
import BacklinkChartComponent
  from '../../../../components/BacklinkChartComponent'

function ChartNoteModal ({ noteContent = '', show, handleClose, backlinkNoteContent = {} }) {
  const backlinkId = backlinkNoteContent.backlinkId
  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton><i
          className="mdi mdi-note"></i></Modal.Header>
        <Modal.Body>
          {noteContent !== '' && _lang.isEmpty(backlinkNoteContent) === true
            ? noteContent
            : <>
              <p>Backlink URL: {backlinkNoteContent.backlinkUrl}</p>
              <p>Target URL: {backlinkNoteContent.targetUrl}</p>
              <p>Target Keyword: {backlinkNoteContent.keyword}</p>
              <p>See performance of this backlink:</p>

              {backlinkId && <BacklinkChartComponent backlinkId={backlinkId}/>}
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ChartNoteModal