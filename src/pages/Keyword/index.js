import React from 'react'
import PageLayout from '../Page/PageLayout'
import AppBreadcrumb from '../../layouts/AppBreadcrumb'
import ProjectList from './ProjectList'
import { ProjectListProvider } from './context/project-list-context'
import {
  projectListReducer,
  projectListStates,
} from './reducer/project-list-reducer'
import CreateProjectButton from './ProjectList/component/CreateProjectButton'

export default function Keyword () {
  return (
    <PageLayout pageTittle="Keyword">
      <AppBreadcrumb page_name="Keyword Projects">
        <CreateProjectButton/>
      </AppBreadcrumb>
      <ProjectListProvider reducer={projectListReducer}
                           initialState={projectListStates}>
        <ProjectList/>
      </ProjectListProvider>
    </PageLayout>
  )
}