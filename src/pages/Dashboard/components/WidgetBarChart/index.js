import React from 'react'
import { IfFulfilled, IfPending, IfRejected, useAsync } from 'react-async'
import { useUser } from './../../../../context/user-context'
import { Bar } from 'react-chartjs-2'
import { Card, CardBody, Col, Row } from 'reactstrap'
import styles from '../../../../assets/css/Dashboard.module.css'
import { getGlobalChartData } from '../../../../utils/backlink-client'

function WidgetBarChart ({ getBacklink }) {
  let globalType = getBacklink === undefined ? 'keyword' : 'backlink'
  let title = getBacklink === undefined
    ? 'Keyword Daily Performance'
    : 'Backlinks Daily Performance'
  let user = useUser()
  const state = useAsync(
    { promiseFn: getGlobalChartData, userId: user.id, type: globalType })
  const barOpts = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: false,
            color: 'rgba(0,0,0,0.05)',
          },
          stacked: false,
          ticks: {
            stepSize: 20,
          },
        }],
      xAxes: [
        {
          barPercentage: 0.7,
          categoryPercentage: 0.5,
          stacked: false,
          gridLines: {
            color: 'rgba(0,0,0,0.01)',
          },
        }],
    },
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col md='6'>
            <h4 className='card-title'>
              <i
                className="mdi mdi-poll black"></i> {title}
            </h4>
          </Col>
          <Col md='6' className='text-right'>
            <h4 className="card-subtitle">
                    <span className='mr-1'><i
                      className={'mdi mdi-checkbox-blank-circle ' +
                      styles.text_up}></i> Up</span>
              <span><i className={'mdi mdi-checkbox-blank-circle ' +
              styles.text_down}></i> Down</span>
            </h4>
          </Col>
        </Row>
        <IfPending state={state}>
          <div className="spinner-grow text-primary m-2"
               role="status"></div>
        </IfPending>

        <IfRejected state={state}>
          {
            error => (
              <div className="alert alert-danger">
                <p>{error.toString()}</p>
                <button onClick={state.reload}>try again</button>
              </div>
            )}
        </IfRejected>

        <IfFulfilled state={state}>
          {data => {
            const chartData = data.data, chartLabel = chartData.labelArray
            const barChart = (canvas) => {
              const ctx = canvas.getContext('2d'),
                gradientStroke = ctx.createLinearGradient(0, 500, 0, 150)

              gradientStroke.addColorStop(0, '#fa5c7c')
              gradientStroke.addColorStop(1, '#727cf5')

              return {
                labels: chartLabel,
                datasets: [
                  {
                    label: 'Up',
                    backgroundColor: gradientStroke,
                    borderColor: gradientStroke,
                    hoverBackgroundColor: gradientStroke,
                    hoverBorderColor: gradientStroke,
                    data: chartData.upArray,
                  },
                  {
                    label: 'Down',
                    backgroundColor: '#e3eaef',
                    borderColor: '#e3eaef',
                    hoverBackgroundColor: '#e3eaef',
                    hoverBorderColor: '#e3eaef',
                    data: chartData.downArray,
                  },
                ],
              }
            }

            return (
              <div>
                <Bar
                  data={barChart}
                  height={400}
                  options={barOpts}
                />
              </div>
            )
          }}
        </IfFulfilled>
      </CardBody>
    </Card>
  )
}

export default WidgetBarChart