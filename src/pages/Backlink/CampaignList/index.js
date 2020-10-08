import React from 'react'
import { fetchCampaignList } from '../../../utils/campaign-client'
import DataComponent from '../../../components/DataComponent'
import {
  CampaignListProvider,
  useCampaignListValue,
} from './campaign-list-context'
import CampaignListItem from './CampaignListItem'
import { Col, Row } from 'reactstrap'
import ButtonRow from './ButtonRow'
import AppBreadcrumb from '../../../layouts/AppBreadcrumb'
import AddCampaignButton from './ButtonRow/Buttons/AddCampaignButton'
import ModalButton from './CampaignListItem/components/ModalButton'

function ItemList ({ campaigns }) {
  return campaigns.map((item) => {
    return (
      <Col md="12" key={item.id}>
        <CampaignListItem campaign_id={item.id}/>
      </Col>
    )
  })
}

function CampaignListComponent () {
  const [{ campaignListCount }] = useCampaignListValue()
  return <DataComponent fetchFn={fetchCampaignList}
                        args={{ watch: campaignListCount }}
                        render={(data) => {
                          return (
                            <>
                              <ButtonRow campaignCount={data.length}/>
                              <Row>
                                <ItemList campaigns={data}/>
                              </Row>
                            </>
                          )
                        }
                        }/>
}

function CampaignList () {
  const initialState = {
    currentPeriod: 'day',
    periodString: '',
    campaignListCount: 0,
  }

  const reducer = (state, action) => {
    if (action.type === 'changeUpDownStats') {
      return {
        ...state,
        currentPeriod: action.currentPeriod,
      }
    } else if (action.type === 'campaignListChange') {
      return {
        ...state,
        campaignListCount: action.campaignListCount,
      }
    } else if(action.type === 'updatePeriodString') {
      return {
        ...state,
        periodString: action.periodString
      }
    } else {
      return state
    }
  }

  return (
    <CampaignListProvider initialState={initialState} reducer={reducer}>
      <AppBreadcrumb page_name="Backlinks">
        <ModalButton render={(toggleModal, modalOpen, props) => (
          <AddCampaignButton toggle={toggleModal}
                             modal_open={modalOpen} {...props}/>)}/>
      </AppBreadcrumb>
      <CampaignListComponent/>
    </CampaignListProvider>
  )
}

export default CampaignList
