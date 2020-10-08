import React from 'react'
import { getKeywordList } from '../../../../utils/project-client'
import ProjectDetailTable from './ProjectDetailTable'
import ButtonSpinner from '../../../../components/ButtonSpinner'
import ActionColumn from './ActionColumn'
import { useProjectDetailValue } from '../../context/project-detail-context'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import ChangeArrow from '../../../../components/ChangeArrow'
import { getUpDownClass } from '../../../../utils/helper'

/**
 * @return {string}
 */
function ThumbIcon ({ type }) {
  let icon = ''
  switch (type) {
    case 'up':
      icon = <span><i className='mdi mdi-thumb-up-outline'/></span>
      break
    case 'down':
      icon = <span><i className='mdi mdi-thumb-down-outline'/></span>
      break
    default:
      icon = <span/>
  }

  return icon
}

function ProjectDetailView ({ projectId }) {
  const [{ keywordFetchCount }] = useProjectDetailValue()
  const columns = React.useMemo(() => [
    {
      Header: 'Keyword',
      accessor: 'keyword_content',
      id: 'keyword',
    },
    {
      id: 'rankingChange',
      Header: 'Change',
      Cell: ({ cell: { value, row } }) => {
        const data = row.original.data

        if(1 === data.length) {
          return 0;
        }

        if (value === null) {
          return <ButtonSpinner/>
        } else {
          return <span className={getUpDownClass(value)}> <ChangeArrow
            value={value}/> {value} </span>
        }
      },
      accessor: 'rankingChange',
    },
    {
      id: 'recentRanking',
      Header: 'Current',
      Cell: ({ cell: { value, row } }) => {
        let latestRanking = value,
          // previousRank = row.original.previousRank,
          bestRanking = row.original.bestRanking,
        data = row.original.data

        if (latestRanking === 0 || latestRanking === 100) {
          return 'Not in top 100'
        }

        // const diffRanking = parseInt(previousRank) - parseInt(latestRanking)

        return latestRanking === null ? <ButtonSpinner/> :
          <span className={{/*getUpDownClass(diffRanking)*/ }}>
            {/*<ChangeArrow value={diffRanking}/> */}
            {latestRanking}
            {(latestRanking === bestRanking
              && latestRanking !== 0 && data.length > 1) &&
            <i className="mdi mdi-star-circle text-success"></i>}</span>
      },
      accessor: 'recentRanking',
    },
    {
      id: 'bestRanking',
      Header: 'Best',
      Cell: ({ cell: { value } }) => value === 0 ? '' : value,
      accessor: 'bestRanking',
    },
    {
      id: 'firstRanking',
      Header: 'First',
      Cell: ({ cell: { value, row } }) => {
        if (null === value) {
          return <ButtonSpinner/>
        }

        // const bestRanking = parseInt(row.original.bestRanking)
        const recentRanking = parseInt(
          0 === row.original.recentRanking ? 100 : row.original.recentRanking)
        const firstRanking = parseInt(value)
        const rankDiff = firstRanking - recentRanking

        let thumbType = ''
        if ((0 === recentRanking && firstRanking > 0)
          || (recentRanking > firstRanking)) {
          thumbType = 'down'
        } else if (recentRanking < firstRanking) {
          thumbType = 'up'
        }

        return <span className={firstRanking === 0 ? 'text-dark' : ''}>{firstRanking === 0 || firstRanking === 100
          ? 'Not in top 100'
          : firstRanking}</span>
      },
      accessor: 'firstRanking',
    },
    {
      id: 'keywordVolume',
      Header: 'Volume',
      accessor: 'keyword_volume',
    },
    {
      id: 'createdAt',
      Header: 'Updated',
      Cell: ({ cell: { value } }) => {
        return value === null ? <ButtonSpinner/> : value
      },
      accessor: 'createdAt',
    },
    {
      id: 'foundUrl',
      Header: 'URL Found',
      Cell: ({ cell: { value } }) => {
        const foundUrl = value.foundUrl === null
          ? 'Url not found'
          : value.foundUrl
        if (foundUrl) {
          return (
            <OverlayTrigger placement="right" key='right' overlay={
              <Tooltip id={value.id}>
                {value.fullFoundUrl}
              </Tooltip>
            }>
              <a href={value.fullFoundUrl} target='_blank'
                 rel='noopener noreferrer'>{foundUrl}</a>
            </OverlayTrigger>
          )
        } else {
          return ''
        }
      },
      accessor: row => ({
        id: row.id,
        foundUrl: row.foundUrl,
        fullFoundUrl: row.fullFoundUrl,
      }),
    },
    {
      id: 'action',
      Header: 'Action',
      disableSortBy: true,
      Cell: ({ cell: { value } }) => {
        return <ActionColumn keywordId={value}/>
      },
      accessor: 'id',
    },
  ], [])
  const [data, setData] = React.useState([])
  const [totalRows, setTotalRows] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, sortBy, changePeriod }) => {
      const fetchID = ++fetchIdRef.current

      setLoading(true)
      if (fetchID === fetchIdRef.current) {
        let sortDir = 'desc', sortField = 'date'
        if (sortBy && sortBy.length > 0) {
          const sortCol = sortBy.slice(0).shift()
          sortDir = sortCol.desc === true ? 'desc' : 'asc'
          sortField = sortCol.id
        }
        getKeywordList({
          projectId: projectId,
          page: pageIndex + 1,
          perPage: pageSize,
          sortDir: sortDir,
          sortField: sortField,
          rankChangePeriod: changePeriod,
        }).then(response => {
          const responseData = response.data.data
          const responseMeta = response.data.meta

          setData(responseData)
          setTotalRows(responseMeta.total)
          setPageCount(Math.ceil(responseMeta.total / pageSize))
          setLoading(false)
        }).catch(error => console.log(error))
      }
    }, [keywordFetchCount, projectId])

  return (
    <ProjectDetailTable columns={columns}
                        data={data}
                        fetchData={fetchData}
                        loading={loading}
                        pageCount={pageCount}
                        projectId={projectId}
                        totalRows={totalRows}/>
  )
}

export default ProjectDetailView