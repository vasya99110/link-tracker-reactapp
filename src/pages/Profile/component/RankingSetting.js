import React from 'react'
import RankingBehaviorForm from './Form/RankingBehavorForm'
import BacklinkAutoArchiveSettingForm
  from './Form/BacklinkAutoArchiveSettingForm'
import ProfileMozApi from './Form/ProfileMozApi'
import BacklinkToxicityNotificationForm
  from './Form/BacklinkToxicityNotificationForm'

function RankingSetting(){
  return <div className='mt-2'>
    <ProfileMozApi/>
    <hr/>
    <RankingBehaviorForm/>
    <hr/>
    <BacklinkAutoArchiveSettingForm/>
    <hr/>
    <BacklinkToxicityNotificationForm/>
  </div>
}

export default RankingSetting