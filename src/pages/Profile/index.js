import React from 'react'
import PageLayout from '../Page/PageLayout'
import AppBreadcrumb from '../../layouts/AppBreadcrumb'
import ProfileMainView from './ProfileMainView'

function Profile () {
  return (
    <PageLayout pageTittle="Profile">
      <AppBreadcrumb page_name="Profile"/>
        <ProfileMainView/>
    </PageLayout>
  )
}

export default Profile