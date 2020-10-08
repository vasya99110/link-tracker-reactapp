// @flow
import * as React from 'react'
import { Card, CardBody } from 'reactstrap'
import * as API from './../../../../utils/API'
import { UserContext } from './../../../../context/user-context'
import Async from 'react-async'

type Props = {
  type: string,
  data: string,
  className: string
};

type State = {
  widgetTitle: string,
  iconClass: string,
  cardClasses: string
}

class WidgetCard extends React.Component<Props, State> {
  state = {
    widgetTitle: '',
    iconClass: 'pbn-dashboard-widget-icon',
    cardClasses: ' shadow-none m-0',
  }

  componentDidMount () {
    let title = '', icon = '', performanceNumber = 0

    switch (this.props.type) {
      case 'tracked':
        if (this.props.data === 'keyword') {
          title = 'Tracked Keywords'
          icon = this.state.iconClass.concat(
            ' text-muted dripicons-time-reverse')
        } else {
          title = 'Tracked Backlinks'
          icon = this.state.iconClass.concat(' text-muted dripicons-link')
        }
        break
      case 'rank_up':
        title = 'Ranked Up'
        icon = this.state.iconClass.concat(
          ' dripicons-arrow-thin-up text-success')
        break
      case 'rank_down':
        title = 'Ranked Down'
        icon = this.state.iconClass.concat(
          ' dripicons-arrow-thin-down text-danger')
        break
      case 'performance':
        title = 'Performance'
        icon = this.state.iconClass.concat(' dripicons-graph-line')
        break
      default:
        break
    }

    this.setState((state, props) => {
      return {
        widgetTitle: title,
        iconClass: icon,
        performanceNumber: performanceNumber,
        cardClasses: props.className + state.cardClasses,
      }
    })
  }

  async getBacklinkState ({ userId, blockType }) {
    let stateValues = 1
    if (blockType === 'tracked') {
      stateValues = await API.get('api/backlink-user-count/' + userId)
    } else if (blockType === 'rank_up' || blockType === 'rank_down') {
      stateValues = await API.get('api/backlink-updown-count/' + userId)
    } else if (blockType === 'performance') {
      stateValues = await API.get('api/backlink-performance/' + userId)
    }

    return stateValues.data
  }

  render () {
    let userContext = this.context
    let performanceIcon
    if (this.props.type === 'performance') {
      performanceIcon =
        <span><i className="dripicons-arrow-thin-up text-success"></i></span>
    }

    return (
      <Card className={this.state.cardClasses}>
        <CardBody className="text-center">
          <Async promiseFn={this.getBacklinkState} userId={userContext.id}
                 blockType={this.props.type}>
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

              let dataReturn = 0
              if (data) {
                if (this.props.type === 'rank_up') {
                  dataReturn = data.data.up
                } else if (this.props.type === 'rank_down') {
                  dataReturn = data.data.down
                } else {
                  dataReturn = data.data
                }

                if (this.props.type === 'performance') {
                  if(dataReturn < 0) {
                    performanceIcon = <span><i
                      className="dripicons-arrow-thin-down text-danger"></i></span>
                  } else if (dataReturn === 0) {
                    performanceIcon = '';
                  }
                }


              return (<>
                <i className={this.state.iconClass}></i>
                <h3><span>{dataReturn}{this.props.type === 'performance' ? '%' : ''}</span> {performanceIcon}</h3>
                <p
                  className="text-muted font-15 mb-0">{this.state.widgetTitle}</p>
              </>)
              }
            }}
          </Async>
        </CardBody>
      </Card>
    )
  }
}

WidgetCard.contextType = UserContext

export default WidgetCard