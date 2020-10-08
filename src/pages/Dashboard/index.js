import React from 'react'
import { createGlobalStyle } from 'styled-components'
import PageLayout from '../Page/PageLayout'
import WidgetRowBacklink from './components/WidgetRow/WidgetRowBacklink'
import WidgetRowBarChart from './components/WidgetRow/WidgetRowBarChart'
import WidgetRowToxicResult from './components/WidgetRow/WidgetRowToxicResult'
import classNames from 'classnames'

const GlobalStyles = createGlobalStyle`
.Dashboard {
    display: inherit;
}

.pbn-dashboard-widget-icon {
    font-size: 24px;
}
.table-sm td, .table-sm th {padding: .3rem}
`

function Dashboard () {
  const [rankingPeriod, setrankingPeriod] = React.useState('day')
  const switchChange = (periodState) => setrankingPeriod(periodState)

  return (
    <>
      <GlobalStyles/>
      <PageLayout pageTittle="Dashboard">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <h4 className="page-title">Dashboard</h4>
            </div>
          </div>
        </div>

        <div className='row mb-1'>
          <div className="col-12">
            <div className='button-list'>
              <button
                className={classNames('btn', 'btn-outline-info',
                  { 'active': 'day' === rankingPeriod })}
                onClick={() => switchChange('day')}
              >Last 24 hours
              </button>
              <button
                className={classNames('btn', 'btn-outline-info',
                  { 'active': 'week' === rankingPeriod })}
                onClick={() => switchChange('week')}
              >Last 7 days
              </button>
            </div>
          </div>
        </div>

        <WidgetRowBacklink type='backlink' rankingPeriod={rankingPeriod}/>
        <WidgetRowBacklink type='keyword' rankingPeriod={rankingPeriod}/>
        <WidgetRowBarChart/>
        <WidgetRowToxicResult/>
      </PageLayout>
    </>
  )
}

export default Dashboard