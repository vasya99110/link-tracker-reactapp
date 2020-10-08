import React from 'react'
import { Col, Row } from 'react-bootstrap'
import UserInfo from './component/Block/UserInfo'
import UserTab from './component/Block/UserTab'
import ErrorBoundary from '../../components/ErrorBoundary'
import UserCredits from './component/Block/UserCredits'

function ProfileMainView () {
  return (
    <ErrorBoundary>
    <Row>
      <Col xl={4} lg={5}>
        <UserInfo/>
      </Col>
      <Col xl={8} lg={7}>
        <UserTab/>
        <UserCredits/>
      </Col>
    </Row>
    </ErrorBoundary>
  )
}

export default ProfileMainView