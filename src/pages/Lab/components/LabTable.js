import React from 'react'
import { useTable } from 'react-table'
import { Table } from 'react-bootstrap'
import LabRow from './LabRow'

function LabTable ({columns, data, onFetchData}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize, sortBy, filters },
  } = useTable({
    columns,
    data
  })

  React.useEffect(() => {
    onFetchData({pageIndex, pageSize, sortBy, filters})
  }, [pageIndex, pageSize, sortBy, filters])

  return (
    <Table bordered {...getTableProps()}>
      <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
        prepareRow(row)
        return (
          <LabRow key={row.id.toString()} row={row}/>
        )
      })}
      </tbody>
    </Table>
  )
}

export default LabTable