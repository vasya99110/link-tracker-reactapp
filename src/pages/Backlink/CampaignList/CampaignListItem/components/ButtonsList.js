import React from 'react'
import { Col, Row } from 'reactstrap'
import EditButton from './EditButton'
import ModalButton from './ModalButton'
import DeleteButton from './DeleteButton'

function ButtonList (props) {
  return (
    <Row>
      <Col md="6" xs="6" className="text-center">
        <ModalButton campaign_id={props.campaign_id}
                     render={(toggleModal, modalOpen, props) => (
                       <EditButton toggle={toggleModal}
                                   modal_open={modalOpen} {...props}/>)}/>
      </Col>
      <Col md="6" xs="6">
        <ModalButton campaign_id={props.campaign_id}
                     render={(toggleModal, modalOpen, props) => (
                       <DeleteButton toggle={toggleModal}
                                     modal_open={modalOpen} {...props}/>)}/>
      </Col>
    </Row>
  )
}

export default ButtonList