import React from 'react'
import { useTable } from 'react-table'
import { Table } from 'react-bootstrap'
import { handleAction } from '../../../../utils/api-client'
import { deleteNote, getNoteList } from '../../../../utils/project-client'
import { useAsync } from 'react-async'
import { useProjectDetailValue } from '../../context/project-detail-context'
import EditNoteButton from './Button/EditNoteButton'

function ProjectNoteTable({columns, data}){
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <Table responsive size="sm" {...getTableProps()}>
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
      {rows.map(
        (row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )}
      )}
      </tbody>
    </Table>
  )
}

function NoteListButton({projectId, noteId}){
  const [{noteFetchCount}, dispatch] = useProjectDetailValue()

  const doDelete = (noteId) => {
    handleAction({
      actionFn: deleteNote,
      successFn: () => {
        dispatch({'type': 'fetchNoteList', noteFetchCount: noteFetchCount + 1})
      },
      data: noteId
    })
  }
  return (
    <div className='button-list'>
      <EditNoteButton projectId={projectId} noteId={noteId}/>
      <span className='span-button text-danger' onClick={(e) => doDelete(noteId)}><i className="mdi mdi-trash-can"></i></span>
    </div>
  )
}

function ProjectNoteList({projectId, keywordId, noteFetchCount}) {
  const { data, error, isPending, reload } = useAsync({
    promiseFn: getNoteList,
    projectId: projectId,
    keywordId: keywordId,
    noteFetchCount: noteFetchCount,
    watchFn: (props, prevProps) => {
      return prevProps.noteFetchCount !== props.noteFetchCount
      || prevProps.projectId !== props.projectId
      || prevProps.keywordId !== props.keywordId
    }
  })

  const columns = React.useMemo(
    () => [
      { Header: 'Date', accessor: 'note_date' },
      { Header: 'Note', accessor: 'note_content' },
      {
        Header: 'Action',
        Cell: ({ cell: { value } }) => {
          return <NoteListButton projectId={projectId} noteId={value}/>
        },
        accessor: 'id'
      }
    ], []
  )

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
    const noteList = data.data.data
    return (
      <ProjectNoteTable columns={columns} data={noteList}/>
    )
  }
}

export default ProjectNoteList