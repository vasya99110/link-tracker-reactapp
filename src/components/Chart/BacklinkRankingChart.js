import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { useAsync } from 'react-async'
import * as API from './../../utils/API'

const fetchChartData = async ({ testId }) => {
  try {
    const result = await API.get('api/backlink-chart-data/' + testId)
    return result.data
  } catch (error) {
    console.dir(error)
    throw error
  }
}

function BacklinkRankingChart (props) {
  const { data, error, isPending, reload } =
    useAsync({
      promiseFn: fetchChartData,
      testId: props.test_id,
    })

  if (isPending) {
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

  if (data) {
    const chartData = data.data
    const dataset = {
      datasets: [
        {
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: '#078DF0',
          borderCapStyle: 'square',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'round',
          pointBorderColor: '#078DF0',
          pointBackgroundColor: '#078DF0',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 6,
          pointHitRadius: 10,
          data: chartData,
        },
      ],
    }

    const chartOption = {
      legend: { display: false },
      title: { display: false },
      tooltips: {
        displayColors: false,
      },
    }

    return (
      <>
        <div className="text-right"><span className="small"
                                          style={{ color: '#B200FF' }}><i
          className="mdi mdi-checkbox-blank-circle"></i> Ranking Behavior Period</span>&nbsp;
          <span className="small" style={{ color: '#078DF0' }}><i
            className="mdi mdi-checkbox-blank-circle"></i> Indexed</span>&nbsp;
          <span
            className="small" style={{ color: '#F48D33' }}><i
            className="mdi mdi-checkbox-blank-circle"></i> Not Indexed</span>
        </div>

        <Line data={dataset} options={chartOption}/>
      </>
    )
  }
}

export default BacklinkRankingChart