import React from 'react'
import { useAsync } from 'react-async'
import {
  getNote,
  getPerformanceChartData,
} from '../../../../../utils/project-client'
import Chart from 'react-apexcharts'
import { Card } from 'react-bootstrap'
import { useProjectDetailValue } from '../../../context/project-detail-context'
import _collection from 'lodash/collection'
import _lang from 'lodash/lang'
import ChartNoteModal from '../ChartNoteModal'

function ProjectPerformanceChart ({ projectId }) {
  const [{ noteFetchCount, keywordFetchCount }] = useProjectDetailValue()
  const [chartPeriod, setChartPeriod] = React.useState('month')

  return (
    <Card body>
      <Card.Title>Average position</Card.Title>
      <div className="toolbar button-list">
        <button id="one_week"
                className={`btn btn-outline-info ${chartPeriod === 'week'
                  ? 'active'
                  : ''}`} onClick={() => setChartPeriod('week')}>1W
        </button>
        <button id="one_month"
                className={`btn btn-outline-info ${chartPeriod === 'month'
                  ? 'active'
                  : ''}`} onClick={() => setChartPeriod('month')}>1M
        </button>
        <button id="one_year"
                className={`btn btn-outline-info ${chartPeriod === 'year'
                  ? 'active'
                  : ''}`} onClick={() => setChartPeriod('year')}>1Y
        </button>
        <button id="all"
                className={`btn btn-outline-info ${chartPeriod === 'all'
                  ? 'active'
                  : ''}`} onClick={() => setChartPeriod('all')}>ALL
        </button>
      </div>
      <div className="mixed-chart">
        <ChartView projectId={projectId}
                   keywordFetchCount={keywordFetchCount}
                   chartPeriod={chartPeriod}
                   noteFetchCount={noteFetchCount}/>
      </div>
    </Card>
  )
}

function ChartView ({ projectId, keywordFetchCount, noteFetchCount, chartPeriod }) {
  const [show, setShow] = React.useState(false)
  const [noteContent, setNoteContent] = React.useState('')
  const handleClose = () => setShow(false)
  const showNote = (content) => {
    setShow(true)
    setNoteContent(content)
  }

  const { data, error, isPending, reload } = useAsync({
    promiseFn: getPerformanceChartData,
    projectId: projectId,
    keywordFetchCount: keywordFetchCount,
    noteFetchCount: noteFetchCount,
    chartPeriod: chartPeriod,
    watchFn: (props, prevProps) => {
      return prevProps.noteFetchCount !== props.noteFetchCount
        || prevProps.keywordFetchCount !== props.keywordFetchCount
        || prevProps.chartPeriod !== props.chartPeriod
        || prevProps.projectId !== props.projectId
    },
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
    const chartValues = data.data.data, projectNotes = data.data.meta.notes
    const dateGroupedNote = _collection.groupBy(projectNotes, function (note) {
      return note.note_date
    })

    let noteArray = []
    for (const [, notes] of Object.entries(dateGroupedNote)) {
      notes.forEach(function (note, key) {
        const baseOffsetY = (((key + 1) * 25) + 10) * -1
        // const noteDate = moment(note.note_date)
        const noteId = note.id
        noteArray.push({
          // x: noteDate.format('YYYY-MM-DD'),
          x: new Date(note.note_date).getTime(),
          label: {
            borderColor: '#ffa60e',
            orientation: 'horizontal',
            position: 'bottom',
            offsetY: baseOffsetY,
            style: {
              background: '#ffa60e',
              color: '#fff',
              cssClass: 'note-' + noteId,
            },
            text: 'Note',
          },
        })
      })
    }

    const chartOptions = {
        annotations: {
          position: 'front',
          xaxis: noteArray,
        },
        chart: {
          id: 'keyword-performance-bar-' + projectId,
          events: {
            click: function (event, chartContext, config) {
              const el = event.target
              let noteId = null

              let noteClass = el.getAttribute('class')

              if (!noteClass) {
                noteClass = el.nextSibling.getAttribute('class')
              }

              noteId = _lang.toInteger(
                noteClass.slice(noteClass.lastIndexOf('-') + 1))

              if (_lang.isInteger(noteId) && noteId > 0) {
                getNote({ noteId }).then(response => {
                  const resData = response.data.data
                  if (resData !== null) {
                    showNote(resData.note_content)
                  }
                })
              }
            },
          },
        },
        noData: {
          text: 'No Ranking Data Now',
          align: 'center',
        },
        xaxis: {
          type: 'datetime',
          // max: moment().valueOf(),
        },
        yaxis: {
          reversed: true,
          min: 1,
          max: 100,
          forceNiceScale: true,
        },
        stroke: {
          width: 3,
        },
        markers: {
          size: 6,
        },
        tooltip: {
          enabled: true,
          /*shared:false,
          intersect: true,*/
          marker: { show: false },
          y: {
            title: {
              formatter: (seriesName) => {return ''},
            },
          },
        },
      },
      chartSeries = [{ data: chartValues }]

    return (
      <>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height="300"
        />
        <ChartNoteModal noteContent={noteContent} show={show}
                        handleClose={handleClose}/>
      </>
    )
  }
}

export default ProjectPerformanceChart