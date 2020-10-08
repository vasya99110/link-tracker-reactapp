import React from 'react'
import { Card } from 'react-bootstrap'
import {
  BacklinkRowProvider,
  useBacklinkRowValue,
} from './backlink-row-context'
import classNames from 'classnames'
import BacklinkRankingApexChart
  from '../../../../../components/Chart/BacklinkRankingApexChart'
import { Button, Table } from 'reactstrap'
import { useAsync } from 'react-async'
import RankingSummary from '../../../../../components/RankingSummary'
import DataComponent from '../../../../../components/DataComponent'
import {
  getBacklinkDataSummary,
  getBacklinkHeader,
} from '../../../../../utils/backlink-client'
import { getUpDownClass } from '../../../../../utils/helper'
import ChangeArrow from '../../../../../components/ChangeArrow'

export default function TableRow ({ row }) {
  return <BacklinkRowProvider reducer={(states, action) => {
    const type = action.type
    if (type === 'toggleRowOpen') {
      return {
        ...states,
        listOpen: action.listOpen,
      }
    } else {
      return states
    }
  }} initialState={{ listOpen: false }}>
    <TableRowView row={row}/>
  </BacklinkRowProvider>
}

function DataRowList (props) {
  const { data, error, isLoading, reload } = useAsync({
    promiseFn: getBacklinkHeader,
    'testId': props.test_id,
  })

  if (isLoading) return (<tr>
    <td colSpan='7'>
      <div className='d-flex align-items-center'>
        <div className="spinner-grow text-primary m-2" role="status"></div>
      </div>
    </td>
  </tr>)

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

    let toxicPercent = backlinkData.toxic_percent
      ? `(${backlinkData.toxic_percent}%)`
      : ''
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
        <td><span
          className={getUpDownClass(lastRankingData.ranking_diff)}><ChangeArrow
          value={lastRankingData.ranking_diff}/> {lastRankingData.ranking_diff}</span>
        </td>
        <td>{backlinkData.article_url}</td>
        <td>{createdOnDateObj.toLocaleDateString()}</td>
        <td><span className={toxicClass}>{toxicStatus} {toxicPercent}</span>
        </td>
      </tr>
    )
  }
}

function TableRowView ({ row }) {
  const [{ listOpen }] = useBacklinkRowValue()
  const backlinkId = row.original.id
  const [chartPeriod, setChartPeriod] = React.useState('month')

  return <>
    <tr {...row.getRowProps()}>
      {row.cells.map(cell => {
        return <td {...cell.getCellProps()}>{cell.render(
          'Cell')}</td>
      })}
    </tr>
    {listOpen && <tr>
      <td colSpan={row.cells.length}>
        <Card body className='mb-2'>
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
            <DataRowList test_id={backlinkId}/>
            </tbody>
          </Table>

          <BacklinkRankingApexChart test_id={backlinkId}
                                    period={chartPeriod}/>

          <div className='button-list text-center'>
            <Button onClick={() => setChartPeriod('week')} outline
                    className='btn-rounded'
                    active={chartPeriod === 'week'}
                    color='info'>Week</Button>
            <Button onClick={() => setChartPeriod('month')} outline
                    active={chartPeriod === 'month'}
                    className='btn-rounded'
                    color='primary'>Month</Button>
            <Button onClick={() => setChartPeriod('all')} outline
                    active={chartPeriod === 'all'}
                    className='btn-rounded'
                    color='success'>All</Button>
          </div>
        </Card>
        <Card body>
          <DataComponent render={(data) => <RankingSummary data={data.data}/>}
                         args={{ 'backlinkId': backlinkId }}
                         fetchFn={getBacklinkDataSummary}/>
        </Card>
      </td>
    </tr>}
  </>
}