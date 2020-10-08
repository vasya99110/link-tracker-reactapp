import React from 'react'
import { Col, Row } from 'react-bootstrap'
import StatChart from './StatChart'
import { useCampaignListValue } from '../../campaign-list-context'

function ToxicityRow (props) {
  const [{ periodString }] = useCampaignListValue()
  return (
    <Row noGutters={true}>
      <Col lg="12">
        <h4>Toxicity Analysis</h4>
        <p>{periodString}</p>
      </Col>
      <Col lg="12">
        <StatChart {...props}/>
      </Col>
    </Row>
  )
}

export default ToxicityRow