import React from 'react'
import { Card, CardBody } from 'reactstrap'
import WidgetCard from '../WidgetCard'

function WidgetRowBacklink({type, rankingPeriod}) {
  return (
    <div className="row">
      <div className="col-12">
        <Card className="widget-inline">
          <CardBody className="p-0">
            <div className="row no-gutters">
              <div className="col-sm-6 col-xl-3">
                <WidgetCard type="tracked" data={type} rankingPeriod={rankingPeriod}/>
              </div>
              <div className="col-sm-6 col-xl-3">
                <WidgetCard type="rank_up" data={type} rankingPeriod={rankingPeriod}
                            className="border-left"/>
              </div>
              <div className="col-sm-6 col-xl-3">
                <WidgetCard type="rank_down" data={type} rankingPeriod={rankingPeriod}
                            className="border-left"/>
              </div>
              <div className="col-sm-6 col-xl-3">
                <WidgetCard type="performance" data={type} rankingPeriod={rankingPeriod}
                            className="border-left"/>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default WidgetRowBacklink