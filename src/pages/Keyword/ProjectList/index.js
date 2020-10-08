import React from 'react'
import ProjectTable from './component/ProjectTable'
import { getProjectList } from '../../../utils/project-client'
import { useUser } from '../../../context/user-context'
import { useProjectListValue } from '../context/project-list-context'
import ProjectActionColumn from './component/ProjectActionColumn'

function ProjectList () {
  const columns = React.useMemo(
    () => [
      {
        id: 'projectName',
        Header: 'Project Name',
        Cell: ({ cell: { value } }) => {
          return <span>{value.projectName}</span>
        },
        accessor: row => ({ id: row.id, projectName: row.project_name }),
      },
      {
        id: 'url',
        Header: 'Domain',
        accessor: 'project_domain',
      },
      {
        id: 'region',
        Header: 'Region',
        accessor: 'project_region',
      },
      {
        id: 'location',
        Header: 'Location',
        accessor: 'project_location',
      },
      {
        id: 'totalKeywords',
        Header: '# Keywords',
        Cell: ({ cell: { value } }) => {
          return <div>
            <span
              className='text-danger font-weight-bold'>{value.totalKeywords}</span>{' '}
            (
            <span
              className='text-success'>{value.ranking_up}</span>{' '}/{' '}<span
            className='text-dark'>{value.ranking_pending}</span>{' '}/{' '}<span
            className='text-danger'>{value.ranking_down}</span>
            )
          </div>
        },
        accessor: row => {
          return {
            ...row.dataStats,
            totalKeywords: row.totalKeywords,
          }
        },
      },
      {
        id: 'latestUpdate',
        Header: 'Last Update',
        accessor: 'latestUpdate',
      },
      {
        id: 'action',
        disableSortBy: true,
        Header: 'Action',
        Cell: ({ cell: { value } }) => {
          return (
            <ProjectActionColumn projectId={value}/>
          )
        },
        accessor: 'id',
      },
    ],
    [],
  )
  const [{ projectFetchCount }] = useProjectListValue()
  const user = useUser()
  const [data, setData] = React.useState([])
  const [totalRows, setTotalRows] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  // const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback(({ pageSize, pageIndex, sortBy }) => {
    setLoading(true)

    let sortDir = 'desc', sortField = 'date'
    if (sortBy && sortBy.length > 0) {
      const sortCol = sortBy.slice(0).shift()
      sortDir = sortCol.desc === true ? 'desc' : 'asc'
      sortField = sortCol.id
    }

    getProjectList({
      userId: user.id,
      page: pageIndex + 1,
      perPage: pageSize,
      sortDir: sortDir,
      sortField: sortField,
    }).then(response => {
      const responseData = response.data.data
      const responseMeta = response.data.meta
      const totalRows = responseMeta.total

      setData(responseData)
      setTotalRows(totalRows)
      setPageCount(Math.ceil(totalRows / pageSize))
      setLoading(false)
    }).catch(error => console.log(error))
  }, [projectFetchCount])

  return <ProjectTable columns={columns}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    pageCount={pageCount}
                    totalRows={totalRows}/>
}

export default ProjectList