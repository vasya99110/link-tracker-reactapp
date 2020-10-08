import React from 'react'
import Chart from 'react-apexcharts'
import { getChartData } from '../../../../../utils/keyword-client'
import { useAsync } from 'react-async'
import _lang from 'lodash/lang'
import { getNote } from '../../../../../utils/project-client'
import ChartNoteModal from '../ChartNoteModal'

function KeywordChart ({ keywordId, period, noteFetchCount }) {
  const { data, error, isPending, reload } = useAsync({
    promiseFn: getChartData,
    keywordId: keywordId,
    period: period,
    noteFetchCount: noteFetchCount,
    watchFn: (props, prevProps) => prevProps.keywordId !== props.keywordId ||
      prevProps.period !== props.period || prevProps.noteFetchCount !==
      props.noteFetchCount,
  })

  const [show, setShow] = React.useState(false)
  const [noteContent, setNoteContent] = React.useState('')
  const [backlinkNoteContent, setBacklinkNoteContent] = React.useState('')

  const showNote = (content, backlinkNote) => {
    setShow(true)
    setNoteContent(content)
    setBacklinkNoteContent(backlinkNote)
  }

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
    const chartValues = data.data.data
    const chartNotes = data.data.meta.notes

    let noteArray = [], noteBacklinks = []
    chartNotes.forEach(function (note, key) {
      const noteBacklink = note.backlink
      const baseOffsetY = (((key + 1) * 25) + 10) * -1
      const noteText = 'keywordNote' === note.note_type ? 'note' : 'indexed'
      const offsetY = 'keywordNote' === note.note_type
        ? baseOffsetY
        : 0

      if('indexed' === noteText) {
          noteBacklinks.push({
            'id' : note.note_id,
            'backlinkId': noteBacklink.id,
            'backlinkUrl': noteBacklink.backlinkUrl,
            'targetUrl': noteBacklink.targetUrl,
            'keyword': noteBacklink.keyword
          })
      }

      /*console.log(momentTz(new Date(note.note_time)).tz('UTC').format("DD MMM YYYY"))
      console.log(momentTz(new Date(note.note_time)).tz('UTC').unix())
      console.log(moment(new Date(note.note_time)).format("DD MMM YYYY z"))

      console.log('timezone', momentTz.tz.guess())*/
      noteArray.push({
        // x: noteDate.format('YYYY-MM-DD'),
        x: note.note_date,
        label: {
          borderColor: '#ffa60e',
          orientation: 'horizontal',
          position: 'bottom',
          offsetY: offsetY,
          showDuplicates: true,
          style: {
            background: '#ffa60e',
            color: '#fff',
            cssClass: 'note-' + note.note_id,
          },
          text: noteText,
        },
      })
    })

    const chartOptions = {
      annotations: {
        position: 'front',
        xaxis: noteArray,
      },
      chart: {
        id: `keyword-line-chart-${keywordId}`,
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

            if (noteId > 0) {
              getNote({ noteId }).then(response => {
                const resData = response.data.data, resMeta = response.data.meta
                let noteContent = '', backlinkNote = {}
                if('keyword' === resMeta.noteType) {
                  noteContent = resData.note_content
                } else {
                  backlinkNote = noteBacklinks.find(x => x.id === noteId )
                }

                showNote(noteContent, backlinkNote)
              })
            }
          },
        },
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
      noData: {
        text: 'No Ranking Data Now',
        align: 'center',
      },
      xaxis: {
        type: 'category',
        labels: {
          /*formatter: function (value, timestamp, index) {
            return moment(new Date(timestamp)).tz('UTC').format("DD MMM YYYY")
          }*/
          trim: true,
          datetimeUTC: true
        },
      },
      yaxis: {
        reversed: true,
        forceNiceScale: true,
        min: 1,
        max: 100,
      },
      stroke: {
        show: true,
        width: 3,
        curve: 'straight',
      },
      markers: {
        size: 6,
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
    }, chartSeries = [
      {
        data: chartValues,
      },
    ]

    return (
      <>
        <Chart
          options={chartOptions}
          series={chartSeries}
          height='500'
          type="line"
        />
        <ChartNoteModal noteContent={noteContent} show={show}
                        backlinkNoteContent={backlinkNoteContent}
                        handleClose={() => setShow(false)}/>
      </>
    )
  }
}

export default KeywordChart