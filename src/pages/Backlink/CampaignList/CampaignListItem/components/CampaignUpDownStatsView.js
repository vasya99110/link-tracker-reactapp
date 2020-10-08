import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useCampaignListValue } from '../../campaign-list-context'

function CampaignUpDownStatsView ({ udstats }) {
  const [, dispatch] = useCampaignListValue()
  const udStats = udstats.data
  const udMeta = udstats.meta, periodString = udMeta.periodString
  /*const rowStyle = React.useMemo(() =>  ({
    "position": "absolute",
    "width": "inherit",
    "bottom": 0
  }), [])*/

  React.useEffect(() => {
    updatePeriodString(periodString)

    function updatePeriodString (periodString) {
      dispatch({
        'type': 'updatePeriodString',
        'periodString': periodString,
      })
    }
  }, [dispatch, periodString])

  return (
    <Row>
      <Col md="6" xs="6" className="text-left">
        <h4>Ranked up</h4>
        <p>
          <span>{udStats.up} <i
            className="dripicons-arrow-thin-up text-success"/></span>
        </p>
        <p>{udStats.prevUpDiff} vs yesterday</p>
      </Col>
      <Col md="6" xs="6">
        <h4>Ranked down</h4>
        <p>
          <span>{udStats.down} <i
            className="dripicons-arrow-thin-down text-danger"/></span>
        </p>
        <p>{udStats.prevDownDiff} vs yesterday</p>
      </Col>
    </Row>
  )
}

export default CampaignUpDownStatsView