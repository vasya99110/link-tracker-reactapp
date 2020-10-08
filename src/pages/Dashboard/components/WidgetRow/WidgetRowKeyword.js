import React from 'react'
import { Card, CardBody } from 'reactstrap'
import WidgetCard from '../WidgetCard'

class WidgetRowKeyword extends React.Component {
  render () {
    return (
      <div className="row">
        <div className="col-12">
          <Card className="widget-inline">
            <CardBody className="p-0">
              <div className="row no-gutters">
                <div className="col-sm-6 col-xl-3">
                  <WidgetCard type="tracked" data="keyword"/>
                </div>
                <div className="col-sm-6 col-xl-3">
                  <WidgetCard type="rank_up" data="keyword" className="border-left"/>
                </div>
                <div className="col-sm-6 col-xl-3">
                  <WidgetCard type="rank_down" data="keyword" className="border-left"/>
                </div>
                <div className="col-sm-6 col-xl-3">
                  <WidgetCard type="performance" data="keyword" className="border-left"/>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default WidgetRowKeyword