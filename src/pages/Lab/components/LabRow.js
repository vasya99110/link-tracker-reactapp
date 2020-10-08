import React from 'react'
import LabKeyword from '../LabKeyword'
import withTableRow from './subTableRow'

/*
  Lab row contain lab item and lab's keywords
 */
export default function LabRow ({ row }) {
  const [listOpen, setListOpen] = React.useState(false)
  const subRow = withTableRow(LabKeyword, row.original.id, row.cells.length)

  return (
    <>
      <tr onClick={() => setListOpen(prevState => !prevState)}
          style={{ 'cursor': 'pointer' }}
          {...row.getRowProps()}
      >
        {row.cells.map(cell => {
          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
        })}
      </tr>
      {listOpen && subRow}
    </>
  )
}