import React from 'react'
import { Button } from 'reactstrap'

function CampaignUpDownButtons({currentPeriod, dispatchFn}) {
  return (
    <>
      <Button color="success" outline={true} active={currentPeriod === 'week'}
              onClick={() => dispatchFn(
                { 'type': 'changeUpDownStats', 'currentPeriod': 'week' })}>Last
        7 days</Button>
      <Button color="info" outline={true} active={currentPeriod === 'day'}
              className={'ml-1'} onClick={() => dispatchFn(
        { 'type': 'changeUpDownStats', 'currentPeriod': 'day' })}>24
        Hours</Button>
    </>
  )
}

export default CampaignUpDownButtons