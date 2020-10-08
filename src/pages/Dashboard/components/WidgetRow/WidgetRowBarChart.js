import React from 'react'
import WidgetBarChart from '../WidgetBarChart'

function WidgetRowBarChart () {
  return (
    <div className="row">
      <div className="col-md-6">
        <WidgetBarChart/>
      </div>
      <div className="col-md-6">
        <WidgetBarChart getBacklink/>
      </div>
    </div>
  )
}

export default WidgetRowBarChart