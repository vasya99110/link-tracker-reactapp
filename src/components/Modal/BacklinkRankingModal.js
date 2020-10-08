import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, Table } from 'reactstrap'
import { useAsync } from 'react-async'
import classNames from 'classnames'
import BacklinkChartComponent from '../BacklinkChartComponent'
import { getBacklinkHeader } from '../../utils/backlink-client'

export default function BacklinkRankingModal (props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [chartPeriod, setChartPeriod] = useState('month')

  const toggleModal = () => props.update_state()

  useEffect(() => {
    function updateModalState () {
      setModalOpen(props.modal_open)
    }
    updateModalState()
  }, [props.modal_open])

  return <Modal isOpen={modalOpen} toggle={toggleModal}
             size='lg' className='modal-full-width'>
        <ModalBody>
          <Table bordered responsive size="sm">
            <thead>
            <tr>
              <th>Keyword</th>
              <th>Target Url</th>
              <th>Rank</th>
              <th>24h Change</th>
              <th>Domain</th>
              <th>Last Updated</th>
              <th>Toxicity</th>
            </tr>
            </thead>
            <tbody>
            <DataRowList test_id={props.test_id}/>
            </tbody>
          </Table>
          <div id="chart">
            <BacklinkChartComponent backlinkId={props.test_id}/>
          </div>
        </ModalBody>
      </Modal>
}

function DataRowList (props) {
  const { data, error, isLoading, reload } = useAsync({
    promiseFn: getBacklinkHeader,
    'testId': props.test_id,
  })

  if (isLoading) return <tr>
    <td colSpan='7'>
      <div className='d-flex align-items-center'>
        <div className="spinner-grow text-primary m-2" role="status"></div>
      </div>
    </td>
  </tr>

  if (error) return (
    <tr>
      <td colSpan='7'>
        <div className="alert alert-danger">
          <p>{error.toString()}</p>
          <button onClick={reload}>try again</button>
        </div>
      </td>
    </tr>
  )

  if (data) {
    const backlinkData = data.data.data
    const lastRankingData = backlinkData.data[0]
    const toxicStatus = backlinkData.toxic_status

    const toxicClass = classNames({
      'text-success': toxicStatus === 'Healthy',
      'text-danger': toxicStatus === 'Toxic',
      'text-muted': toxicStatus === 'Unknown',
    })

    let toxicPercent = backlinkData.toxic_percent ? `(${backlinkData.toxic_percent}%)` : ''
    if (toxicStatus === 'Unknown' || toxicStatus === 'Pending' ||
      toxicStatus === 'Toxic') {
      toxicPercent = ''
    }

    const createdOnDateObj = new Date(lastRankingData.created_on)
    return (
      <tr>
        <td>{backlinkData.keyword}</td>
        <td>{backlinkData.target_url}</td>
        <td>{lastRankingData.recent_ranking}</td>
        <td>{lastRankingData.ranking_diff}</td>
        <td>{backlinkData.article_url}</td>
        <td>{createdOnDateObj.toLocaleDateString()}</td>
        <td><span className={toxicClass}>{toxicStatus} {toxicPercent}</span>
        </td>
      </tr>
    )
  }
}