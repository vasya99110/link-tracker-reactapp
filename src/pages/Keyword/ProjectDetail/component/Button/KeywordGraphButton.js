import React, { useState } from 'react'
// import ProjectModal from '../../../component/ProjectModal'
import KeywordChart from '../Chart/KeywordChart'
import { Button, Modal, ModalBody } from 'reactstrap'

function KeywordGraphButton ({ keywordId }) {
  const [chartPeriod, setChartPeriod] = useState('month')
  const [showModal, setShowModal] = React.useState(false)
  const openModal = (setShowModal) => setShowModal(true)
  const handleClose = () => setShowModal(false)
  const toggleModal = () => setShowModal(prevShow => !prevShow)

  return (
    <>
      <span className='span-button text-success'
            onClick={() => openModal(setShowModal)}>
        <i className="mdi mdi-chart-areaspline"></i></span>

      <Modal isOpen={showModal} toggle={toggleModal} size='xl' className='modal-full-width'>
        <ModalBody>
          <KeywordChart closeModal={handleClose} keywordId={keywordId} period={chartPeriod}/>
          <div className='button-list text-center'>
            <Button onClick={() => setChartPeriod('week')} outline
                    className='btn-rounded'
                    active={chartPeriod === 'week'}
                    color='info'>Week</Button>
            <Button onClick={() => setChartPeriod('month')} outline
                    active={chartPeriod === 'month'}
                    className='btn-rounded'
                    color='primary'>Month</Button>
            <Button onClick={() => setChartPeriod('year')} outline
                    active={chartPeriod === 'year'}
                    className='btn-rounded'
                    color='success'>Year</Button>
            <Button onClick={() => setChartPeriod('all')} outline
                    active={chartPeriod === 'all'}
                    className='btn-rounded'
                    color='success'>All</Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default KeywordGraphButton