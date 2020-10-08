import React from 'react'
import Hashids from 'hashids'
import classNames from 'classnames'
import TableAction from './TableAction'
import { useUser } from '../../../../../context/user-context'
import { getBacklinkList } from '../../../../../utils/backlink-client'
import TableComponent from './TableComponent'
import BacklinkTooltip from './BacklinkTooltip'
import { useCampaignDetailValue } from '../../campaign-detail-context'
import ChangeArrow from '../../../../../components/ChangeArrow'
import moment from 'moment'
import { useBacklinkRowValue } from './backlink-row-context'
import InTopTooltip from '../../../../../components/InTopTooltip'
import { Modal } from 'react-bootstrap'
import MozApiForm from '../../../../../components/Form/MozApiForm'
import { getUpDownClass } from '../../../../../utils/helper'
import TableSpinner from '../../../../../components/TableSpinner'

export default function TableInstance (props) {
  const [{ currentGroupId, backlinkStatus, fetchCount }, dispatch] = useCampaignDetailValue()
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const [totalRows, setTotalRows] = React.useState(0)

  const updateBacklinkStatus = (backlinkStatus) => {
    dispatch({ type: 'updateBacklinkStatus', backlinkStatus: backlinkStatus })
  }

  const columns = React.useMemo(() => [
    {
      id: 'backlinkUrl',
      Header: 'Backlink Url',
      Cell: ({ cell: { value } }) => {
        const articleUrl = String(value.article_url)
        // const urlString = articleUrl.substring(0, 20)
        const urlString = value.shortUrl.substring(0, 10) + '...'
        const hashids = new Hashids(), urlId = hashids.encode(value.id)
        return <BacklinkTooltip tooltip_id={urlId} short_text={urlString}
                                full_text={articleUrl}/>
      },
      accessor: row => ({
        id: row.id,
        article_url: row.article_url,
        shortUrl: row.shortArticleUrl,
      }),
    },
    {
      id: 'anchorText',
      Header: 'Anchor Text',
      accessor: 'keyword',
      Cell: ({ cell: { value } }) => {
        const [{ listOpen }, dispatch] = useBacklinkRowValue()
        const hashids = new Hashids(), urlId = hashids.encode(value)
        return <BacklinkTooltip text_content tooltip_id={urlId}
                                short_text={value.substring(0, 20) + '...'}
                                onClick={() => dispatch({
                                  type: 'toggleRowOpen',
                                  listOpen: !listOpen,
                                })}
                                full_text={value}/>
      },
    },
    {
      id: 'targetUrl',
      Header: 'Target Url',
      // maxWidth: 95,
      Cell: ({ cell: { value } }) => {
        const targetUrl = String(value.target_url)
        // const urlString = targetUrl.substring(0, 20)
        const urlString = value.shortUrl.substring(0, 10) + '...'
        const hashids = new Hashids(), urlId = hashids.encode(value.id)
        return <BacklinkTooltip tooltip_id={urlId} short_text={urlString}
                                full_text={targetUrl}/>
      },
      accessor: row => ({
        id: row.id,
        target_url: row.target_url,
        shortUrl: row.shortTargetUrl,
      }),
    },
    {
      id: 'searchLocation',
      Header: 'Location',
      accessor: 'search_location',
    },
    {
      id: 'indexStatus',
      Header: 'Index',
      Cell: ({ cell: { value } }) => {
        const returnDate = moment(value)

        if (returnDate.isValid()) {
          const shortDate = returnDate.format('MM/DD'),
            fullDate = returnDate.format('YYYY/MM/DD')
          return <BacklinkTooltip tooltip_id={new Hashids().encode(shortDate)}
                                  short_text={shortDate}
                                  full_text={fullDate} text_content/>
        } else {
          if (value === 'pending index') {
            return <TableSpinner/>
          } else return value
        }
      },
      accessor: (row) => row.indexStatus ? row.indexStatus : 'pending index',
    },
    {
      id: 'firstRanking',
      Header: 'First',
      Cell: (props) => {
        const value = props.cell.value, row = props.cell.row,
          dataCount = props.cell.row.original.dataCount
        return dataCount === 1 && value === 0 ? <TableSpinner/> : <InTopTooltip
          value={value}/>
      },
      accessor: 'firstRanking',
    },
    {
      id: 'recentRanking',
      Header: 'Latest',
      Cell: ({ cell: { value, row } }) => {
        const ranking = value, bestRanking = row.original.bestRanking

        return <span>
          {row.original.dataCount === 1 && value === 0 ? <TableSpinner/> :
            <InTopTooltip value={value}/>}
          {' '}
          {bestRanking === ranking &&
          <i className="mdi mdi-star-circle text-success"></i>}
        </span>
      },
      accessor: 'recentRanking',
    },
    {
      id: 'bestRanking',
      Header: 'Best',
      Cell: ({ cell: { value, row } }) => {
        const bestRanking = value, dataCount = row.original.dataCount

        return <span>{dataCount === 1 && (value === 0 || value === null) ?
          <TableSpinner/> :
          <InTopTooltip value={value}/>}</span>
      },
      accessor: 'bestRanking',
    },
    {
      id: 'lifetimeRanking',
      Header: 'Life Change',
      Cell: ({ cell: { value, row } }) => {
        const lifetimeRanking = value, dataCount = row.original.dataCount
        let liftClasses = getUpDownClass(lifetimeRanking)

        if (dataCount === 1 &&
          (lifetimeRanking === 0 || lifetimeRanking === null)) {
          return <TableSpinner/>
        } else {
          return <span className={liftClasses}><ChangeArrow
            value={lifetimeRanking}/> {Math.abs(lifetimeRanking)}</span>
        }
      },
      accessor: row => parseInt(row.lifetimeRanking),
    },
    {
      id: 'dailyChange',
      Header: '24H Change',
      Cell: ({ cell: { value, row } }) => {
        if (value === null) {
          return ''
        }

        const rankingDiff = value, dataCount = row.original.dataCount
        let liftClasses = getUpDownClass(rankingDiff)
        if (dataCount === 1 && (value === 0 || value === '')) {
          return <TableSpinner/>
        } else {
          return <span className={liftClasses}><ChangeArrow
            value={rankingDiff}/> {Math.abs(rankingDiff)}</span>
        }
      },
      accessor: row => parseInt(row.dailyChange),
    },
    {
      id: 'lastWeekRankDiff',
      Header: 'Last 7 Days',
      Cell: ({ cell: { value } }) => {
        const rank = value === null ? 0 : value
        return <span className={getUpDownClass(rank)}>
          <ChangeArrow value={rank}/>{Math.abs(rank)}</span>
      },
      accessor: 'lastWeekRankDiff',
    },
    {
      id: 'toxicity',
      Header: 'Toxicity',
      // maxWidth: 100,
      Cell: ({ cell: { value } }) => {
        let toxicClass = classNames({
          'text-success': value === 'Healthy',
          'text-danger': value === 'Toxic',
        })

        return <span className={toxicClass}>{value}</span>
      },
      accessor: 'toxicity_status',
    },
    /*{
      id: 'time',
      // maxWidth: 75,
      Header: 'Time',
      Cell: ({ cell: { value } }) => {
        return value + '  days'
      },
      accessor: row => parseInt(row.run_since),
    },*/
    {
      id: 'mozMetrics',
      Header: 'Moz Metrics',
      accessor: row => ({
        'moz_metrics': row.moz_metrics,
        'mozAccessId': row.mozAccessId,
        'mozSecret': row.mozSecret,
        'userId': row.user_id,
      }),
      Cell: ({ cell: { value } }) => {
        const accessId = value.mozAccessId, secrect = value.mozSecret
        if (accessId === null && secrect === null) {
          return <MozApiModal userId={value.userId}/>
        } else {
          return value.moz_metrics
        }
      },
    },
    {
      id: 'action',
      disableSortBy: true,
      Header: '',
      Cell: ({ cell: { value } }) => {
        return (
          <TableAction test_id={value.id} test_note={value.note}
                       status={backlinkStatus}/>
        )
      },
      accessor: row => ({ id: row.id, note: row.note }),
    }
  ], [backlinkStatus])

  // const fetchIdRef = React.useRef(0)
  const user = useUser()

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, sortBy, globalFilter = '' }) => {
      // This will get called when the table needs new data
      // You could fetch your data from literally anywhere,
      // even a server. But for this example, we'll just fake it.

      // Give this fetch an ID
      // const fetchID = ++fetchIdRef.current

      // Set the loading state
      setLoading(true)

      // We'll even set a delay to simulate a server here
      // Only update the data if this is the latest fetch
      // if (fetchID === fetchIdRef.current) {
      const startRow = pageSize * pageIndex
      const endRow = startRow + parseInt(pageSize)

      let sortDir = 'desc', sortField = 'date'

      if (sortBy && sortBy.length > 0) {
        const sortCol = sortBy.slice(0).shift()
        sortDir = sortCol.desc === true ? 'desc' : 'asc'
        sortField = sortCol.id

        window.localStorage.setItem('backlinkSortDir', sortDir)
        window.localStorage.setItem('backlinkSortField', sortField)
      } else {
        window.localStorage.removeItem('backlinkSortDir')
        window.localStorage.removeItem('backlinkSortField')
      }

      getBacklinkList({
        userId: user.id,
        campaignId: props.campaign_id,
        groupId: currentGroupId,
        backlinkStatus: props.backlink_status,
        start: startRow,
        end: endRow,
        sortDir: sortDir,
        sortField: sortField,
        searchTerm: globalFilter,
      }).then(response => {
        setData(response.data)
        setTotalRows(response.meta.total_records)
        setPageCount(Math.ceil(response.meta.total_records / pageSize))
        setLoading(false)
      })
      // }
    },
    [user.id, props.campaign_id, props.backlink_status, currentGroupId])

  return (
    <TableComponent columns={columns}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    totalRows={totalRows}
                    updateBacklinkStatus={updateBacklinkStatus}
                    {...props}
    />
  )
}

function MozApiModal ({ userId }) {
  const [{ fetchCount }, dispatch] = useCampaignDetailValue()
  const handleFormUpdated = () => dispatch(
    { type: 'updateFetchCount', fetchCount: fetchCount + 1 })
  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return <>
    <a href='#' onClick={handleShow}>Connect Moz API</a>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Moz Api</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MozApiForm handleClose={handleClose} userId={userId}
                    handleFormUpdated={handleFormUpdated}/>
      </Modal.Body>
    </Modal>
  </>
}