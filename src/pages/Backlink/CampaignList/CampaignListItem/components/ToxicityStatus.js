import React from 'react'
import styled from 'styled-components'
import { StyledBacklinkStatsIcon } from '../../../../../components/styles'

function ToxicDiffComnponent ({ value }){
  if(0 === value) {
    return null
  }

  let statsClass = '', statsIcon = ''
  if(value > 0) {
    statsClass = 'text-success'
    statsIcon = <i className="dripicons-arrow-thin-up"/>
  } else if (value < 0) {
    statsClass = 'text-danger'
    statsIcon = <i className="dripicons-arrow-thin-down"/>
  }

  return <span className={statsClass}>{ value } {statsIcon}</span>
}

//bof styled component
const ToxicItem = styled.div`
  border-bottom: 1px solid #DFE1E6;
`
//eof styled component

function ToxicityStatus ({ diff_array, healthy_tests, neutral_tests, toxic_tests, indexed_link, pending_tests }) {
  return (
    <>
      <ToxicItem className="py-3"><StyledBacklinkStatsIcon
        className="mr-2 bg-success"/><strong>Healthy <div
        className='float-right d-inline'>{healthy_tests} <ToxicDiffComnponent value={diff_array.healthyDiff}/></div></strong></ToxicItem>
      <ToxicItem className="py-3"><StyledBacklinkStatsIcon
        className="mr-2 bg-danger"/><strong>Toxic <div
        className='float-right d-inline'>{toxic_tests} <ToxicDiffComnponent value={diff_array.toxicDiff}/></div></strong></ToxicItem>
      <ToxicItem className="py-3"><StyledBacklinkStatsIcon
        className="mr-2 bg-info"/><strong>Neutral <div
        className='float-right d-inline'>{neutral_tests} <ToxicDiffComnponent value={diff_array.neutralDiff}/></div></strong></ToxicItem>
      <ToxicItem className="py-3"><StyledBacklinkStatsIcon
        className="mr-2 bg-warning"/><strong>Pending <div
        className='float-right d-inline'>{pending_tests}</div></strong></ToxicItem>
      <div className="py-3">Backlink(s) Indexed <span
        className="float-right">{indexed_link}</span></div>
    </>
  )
}

export default ToxicityStatus