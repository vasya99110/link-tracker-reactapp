import React from 'react'
import BacklinkRankingApexChart from './Chart/BacklinkRankingApexChart'
import { Button } from 'reactstrap'

export default function BacklinkChartComponent ({backlinkId}){
  const [chartPeriod, setChartPeriod] = React.useState('month')

  return <>
    <BacklinkRankingApexChart period={chartPeriod} test_id={backlinkId}/>

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
  </>
}