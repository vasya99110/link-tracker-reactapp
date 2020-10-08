import React from 'react'
import { getLabKeywords } from '../../../../utils/lab-client'
import LabKeywordTable from './LabKeywordTable'

export default function LabKeywordTableContainer ({ labId }) {
  const [tableData, setTableData] = React.useState([])

  const columns = React.useMemo(() => [
    {
      Header: 'Keyword',
      accessor: 'keyword_content',
      id: 'keyword',
    },
    {
      Header: 'Current',
      Cell: ({ cell: { value, row } }) => {
        if (0 === value || 100 === value) {
          return 'Not in top 100'
        } else {
          return value
        }
      },
      accessor: 'recentRanking',
      id: 'recentRanking',
    },
    {
      Header: 'First',
      Cell: ({ cell: { value, row } }) => {
        if (0 === value || 100 === value) {
          return 'Not in top 100'
        } else {
          return value
        }
      },
      accessor: 'firstRanking',
      id: 'firstRanking',
    },
  ], [])

  const onFetchData = React.useCallback(
    ({ pageIndex, pageSize, sortBy, filters }) => {
      return getLabKeywords({ labId })
        .then(function (response) {
          setTableData(response.data.data)
        })
    },[labId])

  return <LabKeywordTable data={tableData} columns={columns} onFetchData={onFetchData}/>
}