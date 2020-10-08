import React from 'react'
import AppBreadcrumb from '../../layouts/AppBreadcrumb'
import PageLayout from '../Page/PageLayout'
import FilterableLabTable from './components/FilterableLabTable'
import { useUser } from '../../context/user-context'

function Lab () {
  const user = useUser()
  return (
    // <React.StrictMode>
      <PageLayout pageTittle="Backlink">
        <AppBreadcrumb page_name="Lab"/>
        <FilterableLabTable userId={user.id}/>
      </PageLayout>
    // </React.StrictMode>
  )
}

export default Lab