import React from 'react'
import { Navbar, NavbarToggler } from 'reactstrap'
import 'react-toggle/style.css'
import ModeSwitcher from './components/ModeSwitcher'
import ProfileDropdown from './components/ProfileDropdown'

function PBNNavbar () {
  const customStyle = { 'display': 'inherit' }

  return (
    <>
      <Navbar expand="md" tag="div" className="navbar-custom"
              style={customStyle}>
        <NavbarToggler/>
        <ul className="list-unstyled topbar-right-menu float-right mb-0">
          <ModeSwitcher/>
          <ProfileDropdown/>
        </ul>
      </Navbar>
    </>
  )
}

export default PBNNavbar
