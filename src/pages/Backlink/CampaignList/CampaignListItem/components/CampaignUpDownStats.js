import React from 'react'
import { Col, Row } from 'reactstrap'

function CampaignUpDownStatsView (props) {
  const udstats = props.udstats.data
  return (
    <Row>
      <Col md="6" xs="6" className="text-center">
        <p>
          <span><i
            className="dripicons-arrow-thin-up text-success"/> {udstats.up} Ranked up</span>
        </p>
      </Col>
      <Col md="6" xs="6">
        <p>
          <span><i
            className="dripicons-arrow-thin-down text-danger"/> {udstats.down} Ranked down</span>
        </p>
      </Col>
    </Row>
  )
}

export default CampaignUpDownStatsView