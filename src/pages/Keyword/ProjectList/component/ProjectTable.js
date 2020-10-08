import React from 'react'
import { usePagination, useSortBy, useTable } from 'react-table'
import { Card, Col, Row, Table } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import ButtonSpinner from '../../../../components/ButtonSpinner'
import ProjectDetail from '../../ProjectDetail'
import styled from 'styled-components'
import {
  projectDetailReducer,
  projectDetailStats,
} from '../../reducer/project-detail-reducer'
import { ProjectDetailProvider } from '../../context/project-detail-context'
import { storeHiddenColumnEffect } from '../../../../utils/helper'
import ColumnChooserComponent
  from '../../../../components/ColumnChooserComponent'

const KeywordProjectRow = styled.tr`
  cursor: pointer;
`

function ProjectTable ({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  totalRows,
}) {
  const hiddenColumnsKey = 'projectHiddenColumns'
  const storageHiddenColumns = window.localStorage.getItem(hiddenColumnsKey)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    allColumns,
    toggleHideAllColumns,
    page,
    pageOptions,
    gotoPage,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy, hiddenColumns },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0, pageSize: 10,
        hiddenColumns: storageHiddenColumns === null ? [] : JSON.parse(
          storageHiddenColumns),
      },
      manualPagination: true,
      pageCount: controlledPageCount,
      manualSortBy: true,
      disableMultiSort: true,
      disableSortRemove: true
    },
    useSortBy,
    usePagination,
  )

  function handlePageChange (pageNumber) {
    gotoPage(pageNumber - 1)
  }

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy })
  }, [fetchData, sortBy, pageIndex, pageSize])

  React.useEffect(() => storeHiddenColumnEffect(
    { hiddenColumnsKey: hiddenColumnsKey, hiddenColumns: hiddenColumns })
    , [hiddenColumns])

  // Render the UI for your table
  return (
    <>
      <Row className='mb-1'>
        <Col>
          <ColumnChooserComponent allColumns={allColumns}
                                  toggleHideAllColumns={toggleHideAllColumns}
                                  hiddenColumnsKey={hiddenColumnsKey}/>
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <Card body>
            <Row>
              <Col>
                <Table size="sm" responsive bordered hover {...getTableProps()}>
                  <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(
                          column.getSortByToggleProps())}>{
                          column.render('Header')}
                          <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? <i
                                className='mdi mdi-arrow-down text-secondary'></i>
                              : <i
                                className='mdi mdi-arrow-up text-success'></i>
                            : ''}
                        </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                  {page.map(
                    (row, i) => {
                      prepareRow(row)
                      return <KeywordComponent key={row.original.id} row={row}/>
                    },
                  )}
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row>
              <Col sm='12' md='5'>
                {loading
                  ? (<ButtonSpinner/>)
                  : (<span>Page {pageIndex +
                  1} of {pageOptions.length}</span>)}
              </Col>
              <Col sm='12' md='7'>
                <nav aria-label="Backlink pagination">
                  <Pagination
                    prevPageText={<i className="mdi mdi-chevron-left"></i>}
                    nextPageText={<i className="mdi mdi-chevron-right"></i>}
                    firstPageText={<i
                      className="mdi mdi-chevron-double-left"></i>}
                    lastPageText={<i
                      className="mdi mdi-chevron-double-right"></i>}
                    innerClass='pagination pagination-rounded justify-content-end'
                    itemClass='page-item'
                    linkClass='page-link'
                    activePage={pageIndex + 1}
                    itemsCountPerPage={pageSize}
                    totalItemsCount={totalRows}
                    onChange={handlePageChange}
                  />
                </nav>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}

function KeywordComponent ({ row }) {
  const [listOpen, setListOpen] = React.useState(false)
  const openList = (e) => {
    const classList = e.target.classList

    if (!classList.contains('mdi') && e.target.closest('.modal') === null) {
      setListOpen((prevState => !prevState))
    }
  }

  return (
    <ProjectDetailProvider initialState={projectDetailStats}
                           reducer={projectDetailReducer}>
      <KeywordProjectRow {...row.getRowProps()} onClick={(e) => openList(e)}
                         className="projectRow">
        {row.cells.map(cell => {
          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
        })}
      </KeywordProjectRow>
      {listOpen && <tr>
        <td colSpan={row.cells.length}>
          <ProjectDetail projectId={row.original.id}/>
        </td>
      </tr>}
    </ProjectDetailProvider>
  )
}

export default ProjectTable