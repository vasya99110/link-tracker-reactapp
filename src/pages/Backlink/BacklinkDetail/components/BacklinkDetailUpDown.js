import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

export default function BacklinkDetailUpDownRow (props) {
  const udstats = props.udstats.data
  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <h4>Ranked up</h4>
            <i
              className="dripicons-arrow-thin-up text-success"/> {udstats.up} Ranked
            up
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <h4>Ranked down</h4>
            <i
              className="dripicons-arrow-thin-down text-danger"/> {udstats.down} Ranked
            down
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}