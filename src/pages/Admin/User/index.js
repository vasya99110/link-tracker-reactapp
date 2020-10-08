import React from 'react'
import AppBreadcrumb from '../../../layouts/AppBreadcrumb'
import PageLayout from '../../Page/PageLayout'
import { useUser } from '../../../context/user-context'
import { Redirect } from 'react-router-dom'
import UserListContainer from './UserListContainer'

function User (){
  const user = useUser()

  return user.role === 'admin' ? <PageLayout pageTittle="User Management">
    <AppBreadcrumb page_name="User Management"/>
    <UserListContainer/>
  </PageLayout> : <Redirect to='/dashboard' push/>
}

export default User