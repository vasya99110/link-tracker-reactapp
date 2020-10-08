import React, { useState } from 'react'
import { Col, Row, Table, UncontrolledTooltip } from 'reactstrap'
import classNames from 'classnames'
import * as API from '../../../../../utils/API'
import { useAsync } from 'react-async'
import { useUser } from './../../../../../context/user-context'
import styles from './ToxicTable.module.css'
import BacklinkRankingModal
  from './../../../../../components/Modal/BacklinkRankingModal'
import { useAppContextValue } from '../../../../../context/app-context'
import momentTz from 'moment-timezone'

function RowList (props) {
  const [{ mode }] = useAppContextValue()
  const rowData = props.rowData

  const rowList = rowData.map((data) => {
    const behaviorData = data.behavior_period
    const toxic_status = behaviorData.toxicity_status.toString()
    const toxic_percent = behaviorData.toxicity
    const isToxic = behaviorData.is_toxic

    let toxicStatusTxt
    if (toxic_status === 'Pending' || toxic_status === 'Unknown' || isToxic ===
      1) {
      toxicStatusTxt = toxic_status
    } else {
      toxicStatusTxt = toxic_status + ' ' + Math.abs(toxic_percent) + '%'
    }

    const behaviorClass = classNames({
      'text-success': toxic_status === 'Healthy',
      'text-danger': toxic_status === 'Toxic',
    })

    const articleTooltipId = 'article_tooltip_' + data.id
    const targetTooltipId = 'target_tooltip_' + data.id

    const addRowShadow = (e) => {
      e.currentTarget.classList.add('shadow')
    }

    const removeRowShadow = (e) => {
      e.currentTarget.classList.remove('shadow')
    }

    const triggerBacklinkModal = (testId) => {
      return props.update_modal_id(testId)
    }

    return <tr key={data.id.toString()}
               className={classNames({
                 rounded: true,
                 'bg-white': mode === 'light',
                 'bg-dark-lighten': mode === 'dark',
               })}
               onMouseOver={(e) => {addRowShadow(e)}}
               onMouseOut={(e) => {removeRowShadow(e)}}>
      <td>
            <span
              className={'rounded-circle text-center align-middle float-left'}>
              <i className='mdi mdi-alpha-s-circle' style={{
                'color': data.icon_column.color,
                'fontSize': '2em',
              }}></i>
            </span>
      </td>
      <td>{data.campaign_name}</td>
      <td>
        <a rel='noopener noreferrer' href={data.article_url.full}
           target='_blank'
           id={articleTooltipId}>{data.article_url.sort}</a>
        <UncontrolledTooltip placement="right"
                             target={articleTooltipId}>{data.article_url.full}</UncontrolledTooltip>
      </td>
      <td>
        <a rel='noopener noreferrer' href={data.target_url.full}
           target='_blank'
           id={targetTooltipId}>{data.target_url.sort}</a>
        <UncontrolledTooltip placement="right"
                             target={targetTooltipId}>{data.target_url.full}</UncontrolledTooltip>
      </td>
      <td>
          <span className={behaviorClass}
                onClick={triggerBacklinkModal.bind(this,
                  data.id)}>{toxicStatusTxt}</span>
      </td>
      <td>{momentTz(data.created_on)
        .tz(momentTz.tz.guess(true))
        .format('YYYY-MM-DD')}</td>
    </tr>
  })

  return rowList
}

const getToxicList = async ({ userId, start = 0, offset = 10 }) => {
  try {
    const result = await API.get(
      'api/backlink-toxic-list/' + userId + '?start=' + start + '&offset=' +
      offset)
    return result.data
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

function calculateRange (activePage = 1, limitPage = 10) {
  let offset = activePage * limitPage
  let start

  if (activePage === 1) {
    start = 0
  } else {
    start = offset - limitPage
  }

  return {
    'start': start,
    'offset': offset,
  }
}

function ToxicTable (props) {
  const [modalBacklinkId, setModalBacklinkId] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const user = useUser()
  const currentPage = props.active_page
  const limitPage = 10

  //get info for data fetching
  const { offset, start } = calculateRange(currentPage, limitPage)

  const onUpdateModalId = (testId) => {
    setModalBacklinkId(testId)
    setModalOpen(true)
  }

  const onUpdateModalState = () => {
    setModalOpen((prevOpen) => !prevOpen)
  }

  const { data, error, isLoading, reload } = useAsync({
    promiseFn: getToxicList,
    watch: currentPage,
    userId: user.id,
    start: start,
    offset: offset,
  })

  if (isLoading) return (<div className="spinner-grow text-primary m-2"
                              role="status"></div>)
  if (error) return (
    <div className="alert alert-danger">
      <p>{error.toString()}</p>
      <button onClick={reload}>try again</button>
    </div>
  )

  if (data) {
    let tableData = data.data
    let tableMeta = data.meta
    props.updateTotalRows(tableMeta.totalRecords)
    return (
      <Row>
        <Col>
          <Table responsive size="sm" className={styles.custom_table}>
            <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Campaign Name</th>
              <th>Backlink URL</th>
              <th>Target URL</th>
              <th>Ranking Behavior</th>
              <th>Date</th>
            </tr>
            </thead>
            <tbody>
            <RowList rowData={tableData} update_modal_id={onUpdateModalId}/>
            </tbody>
          </Table>
          <BacklinkRankingModal test_id={modalBacklinkId} modal_open={modalOpen}
                                update_state={onUpdateModalState}/>
        </Col>
      </Row>
    )
  }
}

export default ToxicTable