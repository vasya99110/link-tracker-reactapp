import React from 'react'
import PageLayout from '../Page/PageLayout'
import AppBreadcrumb from '../../layouts/AppBreadcrumb'
import SettingForm from './SettingForm'
import { Col, Row } from 'reactstrap'

export default class extends React.Component {
  render() {
    return (
        <PageLayout pageTittle="Settings">
          <AppBreadcrumb page_name="Settings"/>
          <Row>
            <Col>
              <SettingForm/>
            </Col>
          </Row>
        </PageLayout>
    );
  }
}