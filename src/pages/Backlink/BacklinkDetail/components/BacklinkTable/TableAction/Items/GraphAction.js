import React from 'react'
import { useBacklinkRowValue } from '../../backlink-row-context'
import ActionTooltip from '../ActionTooltip'
import {
  Modal,
  Spinner,
  OverlayTrigger,
  Tooltip,
  Container, Row, Col,
} from 'react-bootstrap'
import { useAsync } from 'react-async'
import {
  getBacklinkDataSummary,
  getBacklinkHeader,
} from '../../../../../../../utils/backlink-client'
import { getUpDownClass, parseDomain } from '../../../../../../../utils/helper'
import './GraphAction.css'
import moment from 'moment'
import classNames from 'classnames'
import styled from 'styled-components'
import ChangeArrow from '../../../../../../../components/ChangeArrow'
import { StyledBacklinkStatsIcon } from '../../../../../../../components/styles'
import BacklinkRankingApexChart
  from '../../../../../../../components/Chart/BacklinkRankingApexChart'
import Select from 'react-select'
import RankingSummary from '../../../../../../../components/RankingSummary'
import DataComponent from '../../../../../../../components/DataComponent'

export default function GraphAction (props) {
  const [{ listOpen }, dispatch] = useBacklinkRowValue()
  const [showModal, setShowModal] = React.useState(false)

  const onUpdateGraphModalState = () => {
    dispatch({ type: 'toggleRowOpen', listOpen: !listOpen })
  }

  /*return <Dropdown.Item href="/" className="text-primary" onClick={(e) => {
    e.preventDefault()
    return onUpdateGraphModalState()
  }}> Graphical View </Dropdown.Item>*/

  return <>
    <ActionTooltip tooltip_type='chart'
                   test_id={props.test_id}
                   test_note='Graphical View'>
      <a href="/#" className="action-icon text-primary"
         onClick={(e) => {
           e.preventDefault()
           setShowModal(true)
         }}> <i className="mdi mdi-chart-line-variant"></i></a>
    </ActionTooltip>

    {showModal && <BacklinkModal test_id={props.test_id} show={showModal}
                                 setShow={setShowModal}/>}
  </>
}

function BacklinkModal ({ test_id, show, setShow }) {
  return <Modal
    show={show}
    centered={false}
    onHide={() => setShow(false)}
    dialogClassName="modal-right graph-modal-dialog modal-full-width"
    aria-labelledby="backlink-side-modal"
  >
    <BacklinkModalContent test_id={test_id}/>
  </Modal>
}

function BacklinkModalContent ({ test_id }) {
  const { data, error, isPending, reload } = useAsync({
    promiseFn: getBacklinkHeader,
    watch: test_id,
    'testId': test_id,
  })

  if (isPending) return <Spinner animation="grow"/>

  if (error) return <div className="alert alert-danger">
    <p>{error.toString()}</p>
    <button onClick={reload}>try again</button>
  </div>

  if (data) {
    const responseData = data.data.data, lastData = responseData.data[0]
    const articleDomain = parseDomain(responseData.article_url)
    const lastUpdateDate = moment(lastData.created_on).fromNow()

    return <>
      <Modal.Header closeButton>
        <Modal.Title id={`backlink-${test_id}-title`}>
          <h4>{articleDomain}</h4>
          <small>Last updated: {lastUpdateDate}</small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <ModalLeftCol responseData={responseData}/>
            <ModalRightCol backlinkId={responseData.id}/>
          </Row>
        </Container>
      </Modal.Body>
    </>
  }
}

const RankingCard = styled.div`
  background-color: #FAFBFC;
  box-shadow: none; 
  border: 1px solid #EBECF0
  
  & h4 {
    font-size: 0.9em
  }
`

function ModalLeftCol ({ responseData }) {
  const lastData = responseData.data[0]
  const backlinkId = responseData.id, keyword = responseData.keyword,
    toxicStatus = responseData.toxic_status,
    recentRanking = lastData.recent_ranking,
    dataDayChange = lastData.ranking_diff

  const targetUrl = responseData.target_url,
    targetDomain = parseDomain(targetUrl)

  return <Col md={3} className="border-right">
    <h4 style={{ color: '#396DF2' }}>{keyword}</h4>
    <small>{targetDomain}</small>

    <RankingCard className="card widget-flat">
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <h4>Rank Sample</h4>
            <span>{recentRanking}</span>
          </div>
          <div className="col-md-6">
            <h4>24h Change</h4>
            <RankingChangeValue value={dataDayChange}/>
          </div>
        </div>
      </div>
    </RankingCard>

    <h4>Domain</h4>
    <ModalDomainTooltip backlinkId={backlinkId}
                        targetDomain={targetDomain}
                        targetUrl={targetUrl}/>

    <h4>Toxicity</h4>
    <ToxicTest toxicStatus={toxicStatus}/>

    <h4>Last Update</h4>
    {moment(lastData.created_on).format('MM/DD/YYYY')}
  </Col>
}

function ModalRightCol ({ backlinkId }) {
  const [chartPeriod, setChartPeriod] = React.useState("month")
  return <Col md={9}>
    <Row className="pt-1">
      <Col md={4}>
        <ChartPeriodSelect updatePeriod={setChartPeriod}/>
      </Col>
      <Col md={8} className="text-right">
                  <span className="mr-1"><StyledBacklinkStatsIcon
                    className="mr-1 bg-warning"/>Not indexed</span>
        <span className="mr-1"><StyledBacklinkStatsIcon
          className="mr-1 bg-primary"/>Toxicity Analysis</span>
        <span className="mr-1"><StyledBacklinkStatsIcon
          className="mr-1" iconColor="#396DF2"/>Indexed</span>
      </Col>
    </Row>
    <Row>
      <Col>
        <BacklinkRankingApexChart test_id={backlinkId} period={chartPeriod}/>
      </Col>
    </Row>
    <Row>
      <Col>
        <DataComponent render={(data) => <RankingSummary data={data.data}/>}
                       args={{ 'backlinkId': backlinkId }}
                       fetchFn={getBacklinkDataSummary}/>
      </Col>
    </Row>
  </Col>
}

function ChartPeriodSelect({updatePeriod}){
  const periodOptions = React.useMemo(() => [
    {value: 'week', label: '7 days'},
    {value: 'month', label: 'Month'},
    {value: 'all', label: 'All'}
  ], [])

  return <form>
    <div className="form-group row">
      <label htmlFor="modal-chart-period-select"
             className="col-sm-2 col-form-label pr-1 text-center" style={{fontSize: '1em'}}>Period</label>
      <div className="col-sm-10">
        <Select options={periodOptions}
                defaultValue={periodOptions[1]} id="modal-chart-period-select"
                onChange={selectedOptions => updatePeriod(selectedOptions.value)}/>
      </div>
    </div>
  </form>
}

function RankingChangeValue ({ value }) {
  return <span className={getUpDownClass(value)}><ChangeArrow
    value={value}/>{' '}{value}</span>
}

function ToxicTest ({ toxicStatus }) {
  const toxicClasses = classNames({
    'text-success': 'Healthy' === toxicStatus,
    'text-danger': 'Toxic' === toxicStatus,
    'text-info': 'Neutral' === toxicStatus,
    'text-warning': 'Pending' === toxicStatus,
  })

  return <span className={toxicClasses}>{toxicStatus}</span>
}

function ModalDomainTooltip ({ backlinkId, targetUrl, targetDomain }) {
  return <OverlayTrigger
    placement="bottom"
    overlay={
      <Tooltip id={`modal-domain-tooltip-${backlinkId}`}>{targetUrl}</Tooltip>
    }>
    <span>{targetDomain}</span>
  </OverlayTrigger>
}