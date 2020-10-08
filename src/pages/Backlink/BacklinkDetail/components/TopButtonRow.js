import { Col, Row } from 'react-bootstrap'
import React from 'react'
import BacklinkButton from './Button/BacklinkButton'
import AddBacklinkModal from './Modal/AddBacklinkModal'
import AddGroupModal from './Modal/AddGroupModal'

export default function TopButtonRow({campaignName}) {
  return (
    <Row className={'mb-2'}>
      <Col md="6">
        <h2 className="text-dark">{campaignName}</h2>
      </Col>
      <Col md="6" className={'text-right'}>
        <div className='button-list'>
          <BacklinkButton color={'primary'} modal_render={({ toggleModal }) => (
            <AddBacklinkModal switch={toggleModal}/>)} size='lg'>Track a new
            backlink</BacklinkButton>
          <BacklinkButton color={'primary'} modal_render={({ toggleModal }) => (
            <AddGroupModal switch={toggleModal}/>)}>Create
            Group</BacklinkButton>
        </div>
      </Col>
    </Row>
  )
}