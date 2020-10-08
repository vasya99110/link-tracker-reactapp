import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { generateHashId } from '../../../../../../utils/helper'
import React from 'react'

function ActionTooltip ({ children, test_id, test_note, tooltip_type }) {
  return (
    <OverlayTrigger placement="top-start" key={`${tooltip_type}-top-start`}
                    overlay={
                      <Tooltip id={`${tooltip_type}-${generateHashId(test_id)}`}>
                        {test_note}
                      </Tooltip>
                    }>
      {children}
    </OverlayTrigger>
  )
}

export default ActionTooltip