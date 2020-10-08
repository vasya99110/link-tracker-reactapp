import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import ToxicTableComponent from './components/ToxicTable'

function WidgetRowToxicResult () {
  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const toNextPage = (event) => {
    setActivePage(activePage + 1)
  }

  const toPrevPage = (event) => {
    setActivePage(activePage - 1)
  }

  const onUpdateTotalRows = (rows) => {
    const totalPages = Math.ceil(rows / 10)
    setTotalPages(totalPages)
  }

  return (
    <>
      <Row>
        <Col>
          <h4 className="mb-4"><i className='mdi mdi-link-variant'></i> Latest
            Toxicity Results</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <ToxicTableComponent active_page={activePage}
                               updateTotalRows={onUpdateTotalRows}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='button-list'>
            <button type="button" className="btn btn-lg btn-dark"
                    onClick={toPrevPage} disabled={activePage === 1}>Previous
            </button>
            <button type="button" className="btn btn-lg btn-success"
                    disabled={totalPages === activePage}
                    onClick={toNextPage}>Next
            </button>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default WidgetRowToxicResult