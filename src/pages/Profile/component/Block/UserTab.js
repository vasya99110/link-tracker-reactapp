import React from 'react'
import { Card, Nav, Tab } from 'react-bootstrap'
import ProfileForm from '../Form/ProfileForm'
import SecurityForm from '../Form/SecurityForm'
import SubscriptionForm from '../Form/SubscriptionForm'
import KeywordSettings from '../KeywordSettings'
import RankingSetting from '../RankingSetting'

function UserTab () {
  return (
    <Card>
      <Card.Body>
        <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
          <Nav variant="pills" className='bg-nav-pills nav-justified'>
            <Nav.Item>
              <Nav.Link eventKey="profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="security">Security</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="subscription">Billing Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="rankingSettings">Backlink Settings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="keywordSettings">Keyword Settings</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="profile"><ProfileForm/></Tab.Pane>
            <Tab.Pane eventKey="security"><SecurityForm/></Tab.Pane>
            <Tab.Pane eventKey="subscription"><SubscriptionForm/></Tab.Pane>
            <Tab.Pane eventKey="rankingSettings"><RankingSetting/></Tab.Pane>
            <Tab.Pane eventKey="keywordSettings"><KeywordSettings/></Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  )
}

export default UserTab