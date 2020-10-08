import React from 'react'
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap'
import { useAuth } from './../../../../../../context/auth-context'
import { useHistory } from 'react-router-dom'
import { useProfileContextValue } from '../../../../../../pages/Profile/profile-context'

function ProfileDropdown () {
  let history = useHistory()
  const { logout } = useAuth()
  const [{ user }] = useProfileContextValue()

  return (
    <UncontrolledDropdown tag="li" className="notification-list">
      <DropdownToggle tag="a" caret href="#"
                      onClick={(e) => {e.preventDefault()}}
                      className="nav-link nav-user arrow-none mr-0">
            <span className="account-user-avatar">
                    <img
                      src={`${user.image}?${Date.now()}`}
                      alt="user-avatar"
                      className="rounded-circle"/>
                </span>
        <span>
                    <span className="account-user-name">{user.name}</span>
                    <span className="account-position">{user.email}</span>
                </span>
      </DropdownToggle>
      <DropdownMenu tag="div"
                    className="dropdown-menu-right dropdown-menu-animated topbar-dropdown-menu profile-dropdown slideIn animated">
        <DropdownItem className="notify-item"
                      onClick={() => history.push('/account')}>
          <i className="mdi mdi-account-circle mr-1"></i>
          <span>My Account</span>
        </DropdownItem>
        <DropdownItem className="notify-item" tag="a" href="#" onClick={logout}>
          <i className="mdi mdi-logout mr-1"></i>
          <span>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default ProfileDropdown