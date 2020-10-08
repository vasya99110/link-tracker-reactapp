import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import styles from '../style/CampaignListItem.module.css'
import CampaignUpDownStats from '../../../../components/CampaignUpDownStats'
import CampaignUpDownStatsView from './components/CampaignUpDownStatsView'
import ToxicityRow from './components/ToxicityRow'
import DataComponent from './../../../../components/DataComponent'
import { CampaignItemContext } from './campaign-item-context'
import {
  getCampaignDetail,
  getCampaignItemToxicityStatus,
} from './../../../../utils/campaign-client'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useCampaignListValue } from '../campaign-list-context'
import styled from 'styled-components'
import ToxicityStatus from './components/ToxicityStatus'
import DotDropDownButton from '../../../../components/DotDropDownButton'
import DeleteButton from './components/DeleteButton'
import EditButton from './components/EditButton'
import ModalButton from './components/ModalButton'

const PieChartCard = styled(Card)`
  background: #FAFBFC;
  min-height: 250px;
`

function ItemDetail (props) {
  const [{ currentPeriod }] = useCampaignListValue()
  let { url } = useRouteMatch()
  let history = useHistory()

  const [shadow, setShadow] = useState(false)
  const campaignId = props.data.id

  const toggleShadow = React.useCallback(
    () => setShadow(prevShadow => !prevShadow), [])

  function toDetail (campaignId, event) {
    const elm = event.target

    if (elm.classList.contains('campaign-delete-btn') === false &&
      elm.classList.contains('campaign-edit-btn') === false &&
      elm.classList.contains('dot-dropdown-link') === false) {
      const redirectUrl = `${url}/campaign/${campaignId}`
      history.push(redirectUrl)
    }
  }

  const dropDownItems = React.useMemo(
    () => {
      const dropDownDeleteBtn = <ModalButton campaign_id={campaignId}
                                             render={(
                                               toggleModal, modalOpen, props) => (
                                               <DeleteButton toggle={toggleModal}
                                                             modal_open={modalOpen} {...props}/>)}/>
      const dropDownEditBtn = <ModalButton campaign_id={props.campaign_id}
                                           render={(
                                             toggleModal, modalOpen, props) => (
                                             <EditButton toggle={toggleModal}
                                                         modal_open={modalOpen} {...props}/>)}/>

      return [dropDownEditBtn, dropDownDeleteBtn]
    },
    [campaignId])

  return (
    <Card onMouseOver={toggleShadow} onMouseOut={toggleShadow}
          onClick={(e) => {toDetail(campaignId, e)}}
          className={`${shadow
            ? 'shadow'
            : ''} ${styles.Card}`}>
      <Card.Header className="text-right">
        <DotDropDownButton itemList={dropDownItems}>
          <span><i className="dot-dropdown-link mdi mdi-dots-horizontal"/></span>
        </DotDropDownButton>
      </Card.Header>

      <Card.Body>
        <Row>
          <Col lg="4">
            <Row className="campaign_detail"
                 style={{ minHeight: '70%', boderBottom: '1px solid #fafafa' }}>
              <Col>
                <h3>{props.data.campaign_name}</h3>
                <h4>{props.meta.group_count} Group(s)</h4>

                <h4 className='pt-3'>Description</h4>
                <p>{props.data.campaign_description}</p>
                <hr/>
              </Col>
            </Row>

            <CampaignUpDownStats upDownPeriod={currentPeriod}
                                 campaign_id={campaignId}
                                 render={data => <CampaignUpDownStatsView
                                   udstats={data}/>}/>
          </Col>

          <DataComponent fetchFn={getCampaignItemToxicityStatus}
                         args={{
                           campaignId: campaignId,
                           currentPeriod: currentPeriod,
                           watch: currentPeriod,
                         }}
                         render={(data) => <>
                           <Col lg="4">
                             <PieChartCard className="mx-0 my-auto">
                               <Card.Body className="p-2">
                                 <ToxicityRow {...data}/>
                               </Card.Body>
                             </PieChartCard>
                           </Col>
                           <Col lg="4">
                             <ToxicityStatus
                               diff_array={data.meta} {...data.data}/>
                           </Col></>
                         }/>
        </Row>
      </Card.Body>
    </Card>
  )
}

function CampaignListItem (props) {
  const [itemEditCount, setItemEditCount] = useState(0)

  function updateEditCount () {
    setItemEditCount(itemEditCount + 1)
  }

  return <DataComponent fetchFn={getCampaignDetail} args={{
    campaignId: props.campaign_id,
    watch: itemEditCount,
  }} render={(data, itemProps) => (
    <CampaignItemContext.Provider value={{
      update_count: updateEditCount,
      campaign_id: props.campaign_id,
      campaign_detail: data.data,
    }}>
      <ItemDetail {...data} {...itemProps} />
    </CampaignItemContext.Provider>)
  }/>
}

export default CampaignListItem