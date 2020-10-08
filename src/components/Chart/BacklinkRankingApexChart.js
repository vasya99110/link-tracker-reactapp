import React from 'react'
import { useAsync } from 'react-async'
import Chart from 'react-apexcharts'
import * as API from '../../utils/API'

const fetchChartData = async ({ testId, period }) => {
  try {
    const result = await API.get(
      'api/backlink-chart-data/' + testId + '?period=' + period)
    return result.data
  } catch (error) {
    console.dir(error)
    throw error
  }
}

function BacklinkRankingApexChart ({ test_id, period }) {
  const { data, error, isPending, reload } = useAsync({
    promiseFn: fetchChartData,
    testId: parseInt(test_id),
    period: period,
    watch: period,
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
    const resultData = data.data, chartMeta = data.meta
    const chartData = resultData.map(item => {
      return {
        x: item.x,
        y: item.y === 0 ? null : item.y,
      }
    })

    const chartSettingOptions = {
      chart: {
        id: `keyword-line-chart-${test_id}`,
        toolbar: {
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        reversed: true,
        forceNiceScale: true,
        /*labels: {
          formatter: (value) => {return value},
        },
        min: 1,
        max: 100,
        forceNiceScale: true,*/
      },
      stroke: {
        show: true,
        width: 3,
        curve: 'straight',
      },
      markers: {
        size: 6,
        // discrete: chartMeta.marker_colors,
        colors: '#ffffff',
        strokeWidth: 1,
        strokeColors: '#396DF2'
      },
      noData: {
        text: 'No Ranking Data Now',
        align: 'center',
      },
      tooltip: {
        enabled: true,
        marker: { show: false },
        x: {
          show: true,
        },
        y: {
          formatter: function (
            value, { series, seriesIndex, dataPointIndex, w }) {
            return value
          },
          title: {
            formatter: (seriesName) => {return ''},
          },
        },
      },
      grid: {
        borderColor: '#CED6DE',
        strokeDashArray: 5,
        show: true,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
      }
    }
    const chartSettingSeries = [
      {
        data: chartData,
      },
    ]

    return (
      <Chart options={chartSettingOptions} series={chartSettingSeries}
             type="line" height='300'/>
    )
  }
}

export default BacklinkRankingApexChart