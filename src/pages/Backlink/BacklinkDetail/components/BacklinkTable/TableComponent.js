import React from 'react'
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table'
import { Button, Card, Col, Dropdown, Modal, Row, Table } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import ActiveTableButton from '../Button/ActiveTableButton'
import ArchiveTableButton from '../Button/ArchiveTableButton'
import TrashedTableButton from '../Button/TrashedTableButton'
import classNames from 'classnames'
import { useCampaignDetailValue } from '../../campaign-detail-context'
import TableRow from './TableRow'
import ColumnChooserComponent
  from '../../../../../components/ColumnChooserComponent'
import { storeHiddenColumnEffect } from '../../../../../utils/helper'
import Select from 'react-select'
import DotDropDownButton from '../../../../../components/DotDropDownButton'
import ActionModal from '../Modal/ActionModal'
import styled from 'styled-components'
import { useAsync } from 'react-async'
import { getCampaignUpDownStats } from '../../../../../utils/campaign-client'
import { useUser } from '../../../../../context/user-context'
import { customReactSelectStyles } from '../../../../../components/styles'

const StyledDotDropDownContainer = styled.div`
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  
  &:hover {
    background-color: #DFE1E6;
    border-radius: 0.25rem;
  }
`
const UpDownIcon = styled.i`
    text-align: left;
    vertical-align: middle;
    font-size: 0.875rem;
    height: 50px;
    line-height: 50px;
    display: inline-block;
    transition: all 0.2s;
`

const UpDownIconTxt = styled.span`
  display: inline-block;
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  font-size:1.75rem;
`

export default function TableComponent ({
  columns,
  data,
  fetchData,
  updateBacklinkStatus,
  loading,
  pageCount: controlledPageCount,
  totalRows,
  backlink_status,
  campaign_id,
}) {
  const [{ savedPageSize, currentPeriod }, dispatch] = useCampaignDetailValue()
  const hiddenColumnsKey = 'hiddenColumns'

  const savePageSize = pageSize => {
    dispatch({ type: 'updatePageSize', savedPageSize: pageSize })
    window.localStorage.setItem('backlinkDetailPageSize', pageSize)
  }

  const storageHiddenColumns = window.localStorage.getItem(hiddenColumnsKey)

  //backlink table config options
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
    setPageSize,
    selectedFlatRows,
    toggleSortBy,
    state: { pageIndex, pageSize, sortBy, hiddenColumns, globalFilter },
    // preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: savedPageSize,
        hiddenColumns: storageHiddenColumns === null ? [] : JSON.parse(
          storageHiddenColumns),
      },
      manualPagination: true,
      manualSortBy: true,
      manualGlobalFilter: true,
      autoResetGlobalFilter: false,
      autoResetSortBy: false,
      disableMultiSort: true,
      disableSortRemove: true,
      pageCount: controlledPageCount,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    },
  )

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy, globalFilter })
  }, [fetchData, pageIndex, pageSize, sortBy, globalFilter])

  React.useEffect(() => storeHiddenColumnEffect(
    { hiddenColumnsKey: hiddenColumnsKey, hiddenColumns: hiddenColumns })
    , [hiddenColumns])

  React.useLayoutEffect(() => {
    if (sortBy.length === 0 &&
      (window.localStorage.getItem('backlinkSortDir') !== null &&
        window.localStorage.getItem('backlinkSortField') !== null)) {
      const localSortDir = window.localStorage.getItem('backlinkSortDir'),
        localSortField = window.localStorage.getItem('backlinkSortField')

      const sortDir = localSortDir === null ? 'desc' : localSortDir
      const sortField = localSortField === null ? 'date' : localSortField

      toggleSortBy(sortField, sortDir === 'desc', false)
    }
  }, [])

  const handlePageChange = (pageNumber) => {
    gotoPage(pageNumber - 1)
  }

  const backlinkStatusOptions = React.useMemo(() => [
    { value: 'active', label: 'Active' },
    { value: 'trashed', label: 'Trashed' },
    { value: 'archived', label: 'Archived' },
  ], [])

  const statusBtnList = React.useMemo(() => {
    const selectedIds = getSelectedIds(selectedFlatRows)
    let statsButton = []

    if ('active' === backlink_status) {
      statsButton = [
        <StatsButton key="archiveBtn" buttonType="archiveBacklink"
                     selectedIds={selectedIds}/>,
        <StatsButton key="deleteBtn" buttonType="deleteBacklink"
                     selectedIds={selectedIds}/>,
      ]
    } else if ('trashed' === backlink_status) {
      statsButton = [
        <StatsButton key="restoreBtn" buttonType="restoreBacklink"
                     selectedIds={selectedIds}/>]
    } else if ('archived' === backlink_status) {
      statsButton = [
        <StatsButton key="deleteBtn" buttonType="deleteBacklink"
                     selectedIds={selectedIds}/>,
        <StatsButton key="restoreBtn" buttonType="restoreBacklink"
                     selectedIds={selectedIds}/>,
      ]
    }
    return statsButton
  }, [backlink_status, selectedFlatRows])

  const dayUpDown = useCampaignUpDownStats(
    { userId: useUser().id, campaignId: campaign_id, period: 'day' })

  return (
    <>
      {loading &&
      <div className="spinner-border text-success" role="status"></div>}
      <Row className='mb-1'>
        <Col md='6'>
          <Row noGutters>
            <Col>
              <GlobalFilter setGlobalFilter={setGlobalFilter}/>
            </Col>
            <Col>
              <form>
                <div className="form-group row no-gutters">
                  <label htmlFor="sortSelect"
                         className="col-sm-8 col-form-label text-right pr-1">Sort
                    By</label>
                  <div className="col-sm-4">
                    <Select options={backlinkStatusOptions}
                            styles={customReactSelectStyles}
                            defaultValue={backlinkStatusOptions[0]}
                            id="sortSelect"
                            onChange={selectedOptions => updateBacklinkStatus(
                              selectedOptions.value)}/>
                  </div>
                </div>
              </form>
            </Col>
          </Row>
        </Col>
        <Col md='6' className="text-center">
          {/*<UpStateButtons className="float-right" render={() => <UpDownButton/>}/>*/}
          <StyledDotDropDownContainer className="float-right">
            <DotDropDownButton itemList={statusBtnList}>
              <span><i
                className="dot-dropdown-link mdi mdi-dots-vertical"/></span>
            </DotDropDownButton>
          </StyledDotDropDownContainer>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4>Ranked up</h4>
              <div>
                <UpDownIcon
                  className="dripicons-arrow-thin-up text-success"></UpDownIcon>{' '}
                <UpDownIconTxt>{dayUpDown &&
                dayUpDown.up}</UpDownIconTxt>
              </div>
              <div>{dayUpDown && dayUpDown.prevWeekUpDiff} vs last week</div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <h4>Ranked down</h4>
              <div>
                <UpDownIcon
                  className="dripicons-arrow-thin-down text-danger"/>{' '}
                <UpDownIconTxt>{dayUpDown && dayUpDown.down}</UpDownIconTxt>
              </div>
              <div>{dayUpDown && dayUpDown.prevWeekDownDiff} vs last week</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <ColumnChooserComponent allColumns={allColumns}
                                  toggleHideAllColumns={toggleHideAllColumns}
                                  hiddenColumnsKey={hiddenColumnsKey}/>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Table responsive size="sm"
                   className='table sortable-table mb-0'
                   {...getTableProps()}>
              <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(
                      column.getSortByToggleProps())}
                        className={classNames({
                          sortable: column.isSorted,
                          'sorting-desc': column.isSorted &&
                            column.isSortedDesc,
                          'sorting-asc': column.isSorted &&
                            !column.isSortedDesc,
                        })}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
              </thead>
              <tbody {...getTableBodyProps()}>
              {page.map(
                (row, i) =>
                  prepareRow(row) || (
                    <TableRow key={row.original.id.toString()} row={row}/>
                  ),
              )}
              </tbody>
              <tfoot>
              <tr>
                <td colSpan="5">
                  {loading && <div className="spinner-grow text-success m-1 float-left"
                                   role="status"></div>}
                  <select className='form-control float-left'
                          style={{
                            width: '20%',
                            marginRight: '5px',
                            height: '40px',
                          }}
                          value={pageSize}
                          onChange={e => {
                            savePageSize(e.target.value)
                            setPageSize(Number(e.target.value))
                          }}
                  >
                    {[10, 20, 30, 40, 50, 100, 200].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                  <span style={{ lineHeight: '40px', color: '#A5ADBA' }}>Rows per page</span>
                </td>
                <td colSpan="5">
                  <nav aria-label="Backlink pagination"
                       style={{
                         margin: '0 auto',
                         width: '50%',
                       }}>
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
                      itemsCountPerPage={parseInt(pageSize)}
                      totalItemsCount={totalRows}
                      onChange={handlePageChange}
                    />
                  </nav>
                </td>
                <td colSpan="5" className="text-right"
                    style={{ lineHeight: '40px' }}>
                  <span>Page {pageIndex + 1} of {pageOptions.length}</span>
                </td>
              </tr>
              </tfoot>
            </Table>
          </Card>
        </Col>
      </Row>
    </>
  )
}

const getSelectedIds = selectedFlatRows => selectedFlatRows.map(
  item => item.original.id)

const StatusButton = (props) => {
  let TableButton = ActiveTableButton
  const handleModal = (idList, handleFn) => {
    if (idList.length === 0) {
      alert('Please select at least 1 backlink')
      return
    }
    handleFn(true)
  }

  if (props.backlink_status === 'trashed') {
    TableButton = TrashedTableButton
  } else if (props.backlink_status === 'archived') {
    TableButton = ArchiveTableButton
  }

  return (
    <div className='button-list float-right' {...props}>
      <TableButton handleModal={handleModal} {...props}/>
    </div>
  )
}

const StatsButton = ({ selectedIds, buttonType }) => {
  const [modalOpen, setModalOpen] = React.useState(false)
  let actionName, modalHeader, modalTitle
  let iconClass = ''
  const handleModal = (selectedIds, handleFn) => {
    if (selectedIds.length === 0) {
      alert('Please select at least 1 backlink')
      return
    }
    handleFn(true)
  }

  if ('deleteBacklink' === buttonType) {
    actionName = 'Remove'
    modalHeader = 'Delete Backlinks'
    modalTitle = 'Do you want to delete these backlinks?'
    iconClass = 'mdi-trash-can'
  } else if ('archiveBacklink' === buttonType) {
    actionName = 'Archive'
    modalHeader = 'Archive Backlinks'
    modalTitle = 'Do you want to archive these backlinks?'
    iconClass = 'mdi-file-document-outline'
  } else if ('restoreBacklink' === buttonType) {
    actionName = 'Restore'
    modalHeader = 'Restore Backlinks'
    modalTitle = 'Do you want to restore these backlinks?'
    iconClass = 'mdi-open-in-new'
  }

  const iconClasses = classNames(`mr-1 mdi ${iconClass}`)

  return <>
    <Dropdown.Item href="/"
                   onClick={(e) => {
                     e.preventDefault()
                     handleModal(selectedIds, setModalOpen)
                   }}>
      <i className={iconClasses}></i><span>{actionName}</span>
    </Dropdown.Item>

    <ActionModal actionType={buttonType}
                 actionParams={{ backlinkIds: selectedIds }}
                 actionScope='multiple' open={modalOpen}
                 switch={() => setModalOpen(((prevOpen) => !prevOpen))}
                 actionName={actionName} modalHeader={modalHeader}
                 modalTitle={modalTitle}/>
  </>
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  },
)

// Define a default UI for filtering
function GlobalFilter ({ setGlobalFilter }) {
  const [searchTerm, setSearchTerm] = React.useState('')

  return (
    <Row noGutters>
      <Col md="9">
        <div className='input-group'>
          <input type='text'
                 className='form-control'
                 placeholder='Search...'
                 value={searchTerm}
                 onChange={e => {
                   const term = e.target.value
                   setSearchTerm(term)

                   if (term.length === 0) {
                     setGlobalFilter(undefined)
                   }
                 }}
          />
          <div className='input-group-append'>
            <button className='btn btn-info' style={{
              backgroundColor: '#396DF2', borderColor: '#396DF2',
              boxShadow: '0px 2px 6px 0px rgb(57, 109, 242)',
            }}
                    onClick={e => setGlobalFilter(searchTerm)}>Filter
            </button>
          </div>
        </div>
      </Col>

      <Col md="3" className="pl-1">
        <a href='/' style={{ lineHeight: '40px', color: '#A5ADBA' }}
           onClick={e => {
             e.preventDefault()
             setGlobalFilter(undefined)
             setSearchTerm('')
           }}>Reset</a>
      </Col>
    </Row>
  )
}

function useCampaignUpDownStats ({ userId, campaignId, period }) {
  const { data, error, isPending } = useAsync(getCampaignUpDownStats, {
    userId: userId,
    campaignId: campaignId,
    currentPeriod: period,
  })

  if (isPending) return 'Loading...'
  if (error) return `Something went wrong: ${error.message}`
  if (data) {
    return data.data
  }
  return null
}