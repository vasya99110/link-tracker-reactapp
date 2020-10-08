import React from 'react'
import { Col, Row } from 'reactstrap'
import UpStateButtons from '../../components/UpStateButtons'
import UpDownButton from './Buttons/UpDownButtons'

function ButtonRow ({ campaignCount }) {
  return (
    <Row className='mb-1'>
      <Col md="6">
        <UpStateButtons render={() => (<UpDownButton/>)}/>
      </Col>
      <Col md="6" className="text-right">
        <p>Currently you have {campaignCount} active campaign(s)</p>
      </Col>
    </Row>
  )
}

export default ButtonRow
