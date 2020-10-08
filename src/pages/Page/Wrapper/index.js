import React from 'react'
import AppLeftSidebar from '../../../layouts/AppLeftSidebar'
import TopBar from '../../../layouts/AppTopBar'
import { Container } from 'reactstrap'
import Footer from '../../../layouts/AppFooter'

function Wrapper ({ children }) {
  return (
    <>
      <div className="wrapper">
        <div id="vertical-sidebar-placeholder"><AppLeftSidebar/></div>
        <div id="detached-sidebar-placeholder"></div>

        <div className="content-page">
          <div className="content">
            <div id="vertical-topbar-placeholder"><TopBar/></div>
            <div id="horizontal-topbar-placeholder"></div>

            <Container fluid={true}>
              {children}
            </Container>
          </div>

          <Footer/>
        </div>
      </div>
    </>
  )
}

export default Wrapper