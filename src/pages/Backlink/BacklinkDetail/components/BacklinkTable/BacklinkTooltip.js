import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

function BacklinkTooltip ({tooltip_id, full_text, short_text, text_content, onClick}) {
  return (
    <>
      <OverlayTrigger placement="right" key='right' overlay={
        <Tooltip id={tooltip_id}>
          {full_text}
        </Tooltip>
      }>
        {text_content ? <span style={{'cursor': 'pointer'}} onClick={onClick}>{short_text}</span>: <a href={full_text} target='_blank' onClick={onClick}
           rel='noopener noreferrer'>{short_text}</a>}
      </OverlayTrigger>
    </>
  )
}

export default BacklinkTooltip