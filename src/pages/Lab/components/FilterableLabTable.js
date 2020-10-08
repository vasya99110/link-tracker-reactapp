import React from 'react'
import LabTable from './LabTable'
import { getLabList } from '../../../utils/lab-client'
import CreateLabModal from './Modal/CreateLabModal'
import { Card, Col, Row } from 'react-bootstrap'

function FilterableLabTable ({userId}) {
  const [searchLabTxt, setSearchLabText] = React.useState('')
  const [sortLabBy, setSortLabBy] = React.useState('created_at')
  const [tableData, setTableData] = React.useState([])
  const [tableUpdateCount, setTableUpdateCount] = React.useState(0)

  const onFetchData = React.useCallback(
    ({ pageIndex, pageSize, sortBy, filters, tableUpdateCount }) => {
      return getLabList(userId).then(function (response) {
        setTableData(response.data.data)
      })
    },
    [userId],
  )

  const columns = React.useMemo(() => [
    {
      id: 'labName',
      Header: 'Lab Name',
      accessor: 'lab_name',
    },
    {
      id: 'labDomain',
      Header: 'Lab Domain',
      accessor: 'lab_domain',
    },
    {
      id: 'labStartDate',
      Header: 'Start Date',
      accessor: 'lab_start_date',
    },
    {
      id: 'labEndDate',
      Header: 'End Date',
      accessor: 'lab_end_date',
    },
    {
      id: 'organicTraffic',
      Header: 'Organic Traffic',
      accessor: 'semrush_organic_traffics',
    },
    {
      id: 'organicKeyword',
      Header: 'Organic Keyword',
      accessor: 'semrush_organic_keywords',
    },
  ], [])

  return (
    <>
      <Row className='mb-1'>
        <Col>
          <CreateLabModal/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <LabTable data={tableData} columns={columns}
                        onFetchData={onFetchData}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default FilterableLabTable