import React from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import BacklinkTable from './BacklinkTable'
import { useCampaignDetailValue } from './../campaign-detail-context'

export default function BacklinkTab (props) {
  const [{ backlinkStatus }, dispatch] = useCampaignDetailValue()

  const toggle = tab => {
    if (backlinkStatus !== tab) {
      dispatch({ type: 'updateBacklinkStatus', backlinkStatus: tab })
    }
  }

  return (
    <>
      <Tab.Container id="backlink-status-tab" onSelect={toggle} defaultActiveKey="active">
        <Row>
          <Nav variant='tabs'>
            <Nav.Item>
              <Nav.Link eventKey="active">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="trashed">Trashed</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="archived">Archived</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey={backlinkStatus}>
                <BacklinkTable backlink_status={backlinkStatus}
                               add_count={props.add_count} {...props}/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}