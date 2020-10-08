import * as React from 'react'
import { Card, CardBody } from 'reactstrap'
import Async from 'react-async'
import * as API from '../../../../utils/API'
import { useUser } from '../../../../context/user-context'

async function getBacklinkState ({ userId, blockType, dataType, rankingPeriod = 'day' }) {
  let stateValues = {}
  switch (dataType) {
    case 'backlink':
      if (blockType === 'tracked') {
        stateValues = await API.get(
          `api/backlink-user-count/${userId}?period=${rankingPeriod}`)
      } else if (blockType === 'rank_up' || blockType === 'rank_down') {
        stateValues = await API.get(
          `api/backlink-updown-count/${userId}?period=${rankingPeriod}`)
      } else if (blockType === 'performance') {
        stateValues = await API.get(
          `api/backlink-performance/${userId}?period=${rankingPeriod}`)
      }
      break
    case 'keyword':
      if (blockType === 'tracked') {
        stateValues = await API.get(
          `api/keywords/count-by-user/${userId}?period=${rankingPeriod}`)
      } else if (blockType === 'rank_up' || blockType === 'rank_down') {
        stateValues = await API.get(
          `api/keywords/updown-stats/${userId}?period=${rankingPeriod}`)
      } else if (blockType === 'performance') {
        stateValues = await API.get(
          `api/keywords/performance/${userId}?period=${rankingPeriod}`)
      }
      break
  }
  return stateValues.data
}

function WidgetCard ({ type, data, rankingPeriod }) {
  const user = useUser(), userId = user.id
  let iconClass = '', title = '', performanceIcon = ''

  switch (type) {
    case 'tracked':
      if (data === 'keyword') {
        title = 'Tracked Keywords'
        iconClass = iconClass.concat(
          ' text-muted dripicons-time-reverse')
      } else {
        title = 'Tracked Backlinks'
        iconClass = iconClass.concat(' text-muted dripicons-link')
      }
      break
    case 'rank_up':
      title = 'Ranked Up'
      iconClass = iconClass.concat(
        ' dripicons-arrow-thin-up text-success')
      break
    case 'rank_down':
      title = 'Ranked Down'
      iconClass = iconClass.concat(
        ' dripicons-arrow-thin-down text-danger')
      break
    case 'performance':
      title = 'Performance'
      iconClass = iconClass.concat(' dripicons-graph-line')
      break
    default:
      break
  }

  return <Card className='shadow-none m-0'>
    <CardBody className="text-center">
      <Async promiseFn={getBacklinkState}
             watchFn={(props, prevProps) => {
               return props.blockType !== 'performance' && props.rankingPeriod !== prevProps.rankingPeriod
             }}
             userId={userId}
             blockType={type}
             rankingPeriod={rankingPeriod}
             dataType={data}>
        {({ data, error, isLoading, reload }) => {
          if (isLoading) {
            return <div className="spinner-grow text-primary m-2"
                        role="status"></div>
          }
          if (error) {
            return (
              <div className="alert alert-danger">
                <p>{error.toString()}</p>
                <button onClick={reload}>try again</button>
              </div>
            )
          }

          let dataReturn = null
          if (data) {
            if (type === 'rank_up') {
              dataReturn = data.data.up
            } else if (type === 'rank_down') {
              dataReturn = data.data.down
            } else {
              dataReturn = data.data
            }
          }

          if (type === 'performance') {
            if (dataReturn < 0) {
              performanceIcon = <span><i
                className="dripicons-arrow-thin-down text-danger"></i></span>
            } else if (dataReturn > 0) {
              performanceIcon = <span><i
                className="dripicons-arrow-thin-up text-success"></i></span>
            }
          }

          return (<>
            <i className={iconClass}></i>
            <h3><span>{dataReturn}{type === 'performance'
              ? '%'
              : ''}</span> {performanceIcon}</h3>
            <p
              className="text-muted font-15 mb-0">{title}</p>
          </>)
        }
        }
      </Async>
    </CardBody>
  </Card>

}

export default WidgetCard