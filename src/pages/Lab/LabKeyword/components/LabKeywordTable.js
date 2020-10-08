import React from 'react'
import { useTable } from 'react-table'
import { Table } from 'react-bootstrap'

export default function LabKeywordTable({columns, data, onFetchData}) {
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
  }, [onFetchData,pageIndex, pageSize, sortBy, filters])

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
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
          </tr>
        )
      })}
      </tbody>
    </Table>
  )
}