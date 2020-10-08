import React, { useEffect } from 'react'
import Chart from 'react-apexcharts'

export default function StatChart (props) {
  const [chartOptions, setChartOptions] = React.useState({})
  const [chartSeries, setChartSeries] = React.useState([])

  const statsData = props.data,
    { healthy_tests, neutral_tests, toxic_tests, pending_tests } = statsData

  useEffect(() => {
    const initChartData = (
      healthy_tests, neutral_tests, toxic_tests, pending_tests) => {
      let labelArray = [], colorArray = [], valueArray = []

      let options = {
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: "round",
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                },
              },
              size: '85%',
              background: '#FAFBFC',
            },
          },
        },
        noData: {
          'text': 'No data',
          style: {
            color: '#000000',
            fontSize: '14px',
          },
        },
        legend: { show: false, onItemHover: { highlightDataSeries: true } },
        dataLabels: {
          enabled: false,
        },
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                height: 240,
              },
              legend: {
                show: false,
              },
            },
          }],
      }

      if (parseInt(healthy_tests) === 0 && parseInt(neutral_tests) === 0 &&
        parseInt(toxic_tests) === 0 && pending_tests === 0) {
        valueArray = [100]
        labelArray = ['No data']
        colorArray = ['#7b8084']

        options.plotOptions.pie.donut.labels = {
          show: true,
          name: {
            show: true,
            offsetY: 0,
          },
          value: {
            show: false,
            color: 'red',
          },
          total: {
            show: false,
            color: 'red',
          },
        }
      } else {
        labelArray = ['Healthy', 'Neutral', 'Toxic', 'Pending']
        colorArray = ['#0acf97', '#39afd1', '#fa5c7c', '#ffbc00']
        valueArray = [
          parseInt(healthy_tests),
          parseInt(neutral_tests),
          parseInt(toxic_tests),
          parseInt(pending_tests)]
        /*valueArray = [
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10)
        ]*/
      }

      options.labels = labelArray
      options.colors = colorArray

      setChartOptions(options)
      setChartSeries(valueArray)
    }

    initChartData(healthy_tests, neutral_tests, toxic_tests, pending_tests)
  }, [healthy_tests, neutral_tests, toxic_tests, pending_tests])

  return (
    <div>
      <Chart className='apex-charts' options={chartOptions}
             series={chartSeries}
             type="donut" width="100%"/>
    </div>
  )
}
