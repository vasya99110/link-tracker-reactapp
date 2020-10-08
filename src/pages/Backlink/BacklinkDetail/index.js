import React from 'react'
import PageLayout from '../../Page/PageLayout'
import TopButtonRow from './components/TopButtonRow'
import { Col, Row } from 'react-bootstrap'
import GroupListRow from './components/GroupListRow'
import { useParams } from 'react-router-dom'
import {
  CampaignDetailProvider,
  useCampaignDetailValue,
} from './campaign-detail-context'
import reducer from './reducer'
import { useUser } from '../../../context/user-context'
import { getGroups } from '../../../utils/group-client'
import DataComponent from '../../../components/DataComponent'
import { getCampaignDetail } from '../../../utils/campaign-client'
import BacklinkTable from './components/BacklinkTable'

function BacklinkDetail () {
  const user = useUser(), userId = user.id
  let { campaignId } = useParams()
  campaignId = parseInt(campaignId)

  const [campaignDetail, setCampaignDetail] = React.useState({})

  React.useEffect(() => {
    getCampaignDetail({ campaignId }).then(r => {
      const campaignData = r.data
      setCampaignDetail(campaignData)
    })
  }, [campaignId])

  return (
    <PageLayout>
      <div className="row">
        <div className="col-12">
          <h4 style={{ verticalAlign: 'middle', display: 'inline-block' }}>
            <span style={{ fontWeight: 400, color: '#A5ADBA' }}>
            Backlinks</span> <span><i
            className="mdi mdi-chevron-right"></i> <strong>{campaignDetail.campaign_name}</strong>
          </span></h4>
        </div>
      </div>

      <DataComponent fetchFn={getGroups}
                     args={{ campaignId: campaignId, userId: userId }}
                     render={(groupData) => <BacklinkDetailView
                       group_list={groupData.data}
                       campaign_id={campaignId}
                       campaign_name={campaignDetail.campaign_name}
                     />
                     }/>
    </PageLayout>
  )
}

function MainView ({ campaign_id, campaign_name }) {
  const [{ currentPeriod, groupList, currentGroupId, addLinkCount, backlinkStatus }] = useCampaignDetailValue()
  return (
    <>
      <TopButtonRow campaignName={campaign_name}/>

      <GroupListRow campaign_id={campaign_id} group_list={groupList}/>

      {/*<Row>
        <Col md={'6'}>
          <GroupListRow campaign_id={campaign_id}
                            group_list={groupList}/>
        </Col>
        <Col className={'text-right'} md={'6'}>
          <UpStateButtons render={() => <UpDownButton/>}/>
        </Col>
      </Row>*/}

      {/*<Row className="mt-1">
        <Col md={'6'}>
          <div className='button-list'>
            <BacklinkButton color={'primary'}
                            modal_render={({ toggleModal }) => (
                              <EditGroupModal
                                currentGroupId={currentGroupId}
                                switch={toggleModal}/>)}>Edit
              Group</BacklinkButton>
          </div>
        </Col>
        <Col md={'6'} className={'text-right mt-1 mt-md-0'}>
          <CampaignUpDownStats upDownPeriod={currentPeriod}
                               campaign_id={campaign_id}
                               render={data => <BacklinkDetailUpDown
                                 udstats={data}/>}/>
        </Col>
      </Row>*/}

      <Row>
        <Col xs='12'>
          {/*<BacklinkTab campaign_id={campaign_id}
                       add_count={addLinkCount}/>*/}
          <BacklinkTable backlink_status={backlinkStatus} campaign_id={campaign_id}
                         add_count={addLinkCount}/>
        </Col>
      </Row>
    </>
  )
}

function BacklinkDetailView (props) {
  const storagePagesize = window.localStorage.getItem('backlinkDetailPageSize')

  return (
    <CampaignDetailProvider reducer={reducer} initialState={{
      backlinkStatus: 'active',
      currentPeriod: 'day',
      campaignId: props.campaign_id,
      groupList: props.group_list,
      currentGroupId: props.group_list[0].id,
      defaultGroupId: props.group_list[0].id,
      fetchCount: 0,
      savedPageSize: storagePagesize === null ? 10 : storagePagesize,
    }}>
      <MainView {...props}/>
    </CampaignDetailProvider>
  )
}

export default BacklinkDetail