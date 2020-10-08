import React from 'react'
import styled from 'styled-components'

export const StyledBacklinkStatsIcon = styled.span`
  position:relative;
  top:0.1rem;
  border-radius: 4px;
  width:12px;
  height: 12px;
  display: inline-block;
  background-color: ${props => props.iconColor || "inherit"}
`

export const customReactSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: 'none',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: 'none',
  }),
}