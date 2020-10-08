import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Preloader from './components/Preloader'
import { useUser } from './context/user-context'
import { createGlobalStyle } from 'styled-components'
import { AppContextProvider } from './context/app-context'
import themeReducer from './reducers/theme'

const GlobalStyles = createGlobalStyle`
  .table {
    font-weight: 600;
  }
  .span-button {
    margin-bottom: 12px;
    margin-left: 8px;
  }
  
  .span-button:hover {
    cursor: pointer;
  }
  .action-columns {
    font-size: 1.4em;
  }
    
  /*.sortable-table th, .sortable-table td {
    padding: 0.95rem 2em 0.95rem 0.95rem;
  }
  
  .sortable-table th:last-child, .sortable-table td:last-child {padding-left: 0; padding-right: 0}*/
  .sortable-table th:last-child {text-align: center}
  .sortable-table>thead>tr>th {
    position: relative;
  }
  .sortable-table>thead>tr>th.sortable:after {
    display: inline-block;
    font: normal normal normal 24px/1 "Material Design Icons";
    font-size: inherit;
    text-rendering: auto;
    line-height: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align:left;
    position: absolute;
    right: 0;
  }
  .sortable-table>thead>tr>th.sorting-asc:after {
    content: "\\F05D"
  }
  .sortable-table>thead>tr>th.sorting-desc:after {
    content: "\\F045"
  }
  
  .apexcharts-xaxis-annotation-label:hover {
      cursor: pointer;
  }
`

function DashboardApp () {
  const user = useUser()
  if (!user) {
    return <Redirect to="/login"/>
  }

  //admin routes
  const AdminUser = lazy(() => import('./pages/Admin/User'))

  //user routes
  const Dashboard = lazy(() => import('./pages/Dashboard'))
  const Lab = lazy(() => import('./pages/Lab'))
  const Profile = lazy(() => import('./pages/Profile'))
  const Keyword = lazy(() => import('./pages/Keyword'))
  const Settings = lazy(() => import('./pages/Settings'))
  const Backlink = lazy(() => import('./pages/Backlink'))
  const BacklinkDetail = lazy(() => import('./pages/Backlink/BacklinkDetail'))

  const localMode = localStorage.getItem('themeMode')
  const defaultThemeMode = localMode ? localMode : 'light'

  return (
    <AppContextProvider initialState={{ mode: defaultThemeMode }}
                        reducer={themeReducer}>
      <GlobalStyles/>
      <BrowserRouter>
        <Suspense fallback={<Preloader/>}>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/account" exact component={Profile}/>
            <Route path="/keywords" exact component={Keyword}/>
            {/*<Route path="/keywords/detail/:projectId" exact
                   component={KeywordDetail}/>*/}
            <Route path="/setting" exact component={Settings}/>
            <Route path="/backlinks" exact component={Backlink}/>
            <Route path="/users" exact component={AdminUser}/>
            <Route path="/labs" exact component={Lab}/>
            <Route path="/backlinks/campaign/:campaignId" exact
                   component={BacklinkDetail}/>
            {/*<Route render={props => <Auth {...props} type="NoMatch"/>}/>*/}
            <Route render={() => <Redirect to="/dashboard"/>}/>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </AppContextProvider>
  )
}

export default DashboardApp
