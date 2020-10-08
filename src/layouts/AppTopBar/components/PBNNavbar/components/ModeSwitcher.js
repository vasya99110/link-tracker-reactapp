import React from 'react'
import Toggle from 'react-toggle'
import ModeSwitcherIcon from './ModeSwitcherIcon'
import { useAppContextValue } from '../../../../../context/app-context'
import styled from 'styled-components'

const ModeSwitcherStyle = styled.div`
  position: relative;
  top: calc(38px / 2)
`

function ModeSwitcher () {
  const [{ mode }, dispatch] = useAppContextValue()
  const handleChange = (mode, e) => {
    const checkedState = e.target.checked
    let newTheme = checkedState ? 'dark' : 'light'
    dispatch({ type: 'changeTheme', mode: newTheme })
    localStorage.setItem('themeMode', newTheme)
  }

  return (
    <li className="notification-list d-lg-block">
      <ModeSwitcherStyle>
          <Toggle
            defaultChecked={mode === 'dark'}
            icons={{
              checked: <ModeSwitcherIcon className='moon'/>,
              unchecked: <ModeSwitcherIcon className='sun'/>,
            }}
            onChange={(e) => handleChange(mode, e)}/>
      </ModeSwitcherStyle>
    </li>
  )
}

export default ModeSwitcher