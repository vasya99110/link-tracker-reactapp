import React from 'react'
import { usePagination, useSortBy, useTable } from 'react-table'
import { Button, Card, Col, FormControl, Row, Table } from 'react-bootstrap'
import ButtonSpinner from '../../../../components/ButtonSpinner'
import Pagination from 'react-js-pagination'
import KeywordChart from './Chart/KeywordChart'
import AddProjectNoteButton from './Button/AddProjectNoteButton'
import DataComponent from '../../../../components/DataComponent'
import RankingSummary from '../../../../components/RankingSummary'
import { getKeywordSummary } from '../../../../utils/keyword-client'
import { useProjectDetailValue } from '../../context/project-detail-context'
import { storeHiddenColumnEffect } from '../../../../utils/helper'
import ColumnChooserComponent
  from '../../../../components/ColumnChooserComponent'
import KeywordChangePeriod from './KeywordChangePeriod'
import styled from 'styled-components'
import ProjectNoteList from './ProjectNoteList'

function PageSelect ({ pageSize, setPageSize, pageIndex, pageOptions, gotoPage }) {
  const PageSpan = React.useMemo(() => styled.span`
    float: left;
    margin-right: 5px;
    line-height: 2.3em
  `, [])

  const maxPage = pageOptions.length
  return <Row>
    <Col>
      <PageSpan>Page</PageSpan>
      <PageSpan><FormControl min='1' max={maxPage} size='sm' type='number'
                             defaultValue={pageIndex + 1} onChange={e => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0
        gotoPage(page)
      }}/></PageSpan>
      <PageSpan>of {maxPage}</PageSpan>
      <PageSpan>
        <FormControl size='sm' as='select' value={pageSize} onChange={e => {
          setPageSize(Number(e.target.value))
        }}>
          {[20, 50, 100, 200, 300, 400, 500].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </FormControl>
      </PageSpan>
    </Col>
  </Row>
}

function ProjectDetailTable ({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  totalRows,
  projectId,
}) {
  const hiddenColumnsKey = `KeywordHiddenColumns_${projectId}`
  const storageHiddenColumns = window.localStorage.getItem(hiddenColumnsKey)
  const [changePeriod, setChangePeriod] = React.useState(1)
  const updateRankPeriod = (period) => setChangePeriod(period)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    gotoPage,
    setPageSize,
    allColumns,
    toggleHideAllColumns,
    // Get the state from the instance
    state: { pageIndex, pageSize, sortBy, hiddenColumns },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0, pageSize: 20,
        hiddenColumns: storageHiddenColumns === null ? [] : JSON.parse(
          storageHiddenColumns),
      },
      manualPagination: true,
      manualSortBy: true,
      disableMultiSort: true,
      autoResetSortBy: false,
      disableSortRemove: true,
      pageCount: controlledPageCount
    },
    useSortBy,
    usePagination,
  )

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy, changePeriod })
  }, [fetchData, pageIndex, pageSize, sortBy, changePeriod])

  React.useEffect(() => storeHiddenColumnEffect(
    { hiddenColumnsKey: hiddenColumnsKey, hiddenColumns: hiddenColumns })
    , [hiddenColumns])

  React.useLayoutEffect(() => {
    gotoPage(0)
  }, [projectId])

  function handlePageChange (pageNumber) {
    gotoPage(pageNumber - 1)
  }

  return (
    <Card body>
      <Row className='mb-1'>
        <Col>
          <ColumnChooserComponent allColumns={allColumns}
                                  toggleHideAllColumns={toggleHideAllColumns}
                                  hiddenColumnsKey={hiddenColumnsKey}/>
        </Col>
        <Col>
          <KeywordChangePeriod updateRankPeriod={updateRankPeriod}
                               rankPeriod={changePeriod}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table size="sm" responsive bordered {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(
                    column.getSortByToggleProps())}>{column.render(
                    'Header')}
                    <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <i className='mdi mdi-arrow-down text-secondary'></i>
                        : <i className='mdi mdi-arrow-up text-success'></i>
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
                return <KeywordRow row={row} projectId={projectId}
                                   keywordId={row.original.id}
                                   key={row.original.id}/>
              },
            )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col sm='12' md='5'>
          {loading
            ? <ButtonSpinner/>
            : <PageSelect setPageSize={setPageSize} pageIndex={pageIndex}
                          pageOptions={pageOptions} gotoPage={gotoPage}
                          pageSize={pageSize}/>}
        </Col>
        <Col sm='12' md='7'>
          <nav aria-label="Keyword pagination">
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
  )
}

function KeywordRow ({ row, keywordId, projectId }) {
  const [listOpen, setListOpen] = React.useState(false)
  const [chartPeriod, setChartPeriod] = React.useState('month')
  const [{ noteFetchCount }] = useProjectDetailValue()

  const openList = (e) => {
    const classList = e.target.classList

    if (!classList.contains('mdi') && e.target.closest('.modal') === null) {
      setListOpen((prevState => !prevState))
    }
  }

  return (
    <>
      <tr {...row.getRowProps()} style={{ 'cursor': 'pointer' }}
          onClick={(e) => openList(e)}>
        {row.cells.map(cell => {
          return (
            <td {...cell.getCellProps()}>{cell.render(
              'Cell')}</td>
          )
        })}
      </tr>
      {listOpen && <tr>
        <td colSpan={row.cells.length}>
          <Card body className='mb-2'>
            <KeywordChart keywordId={keywordId} period={chartPeriod}
                          noteFetchCount={noteFetchCount}/>
            <div className='button-list text-center'>
              <Button onClick={() => setChartPeriod('week')} outline="true"
                      className='btn-rounded'
                      active={chartPeriod === 'week'}
                      color='info'>Week</Button>
              <Button onClick={() => setChartPeriod('month')} outline="true"
                      active={chartPeriod === 'month'}
                      className='btn-rounded'
                      color='primary'>Month</Button>
              <Button onClick={() => setChartPeriod('year')} outline="true"
                      active={chartPeriod === 'year'}
                      className='btn-rounded'
                      color='success'>Year</Button>
              <Button onClick={() => setChartPeriod('all')} outline="true"
                      active={chartPeriod === 'all'}
                      className='btn-rounded'
                      color='success'>All</Button>
              <AddProjectNoteButton projectId={projectId} keywordId={keywordId}
                                    className='float-right'/>
            </div>
          </Card>

          <Card body>
            <ProjectNoteList projectId={projectId} keywordId={keywordId} noteFetchCount={noteFetchCount}/>
          </Card>

          <Card body className='mb-2'>
            <DataComponent render={(data) => <RankingSummary data={data.data}/>}
                           args={{ 'keywordId': keywordId }}
                           fetchFn={getKeywordSummary}/>
          </Card>
        </td>
      </tr>}
    </>
  )
}

export default ProjectDetailTable