import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Arc, Layer, Stage, Text } from 'react-konva'
import { useUser } from '../../../../context/user-context'
import { getCreditStats } from '../../../../utils/user-client'

function UserCredits () {
  const user = useUser()
  const [creditStats, setCreditStats] = React.useState({})

  useEffect(() => {
    getCreditStats({ userId: user.id }).then(response => {
      setCreditStats(response.data.data)
    })
  }, [])

  return <Card body={true}>
    <Row>
      <CreditChart type='remaining' {...creditStats}/>
      <CreditChart type='used' {...creditStats}/>
      <CreditChart type='total' {...creditStats}/>
    </Row>
  </Card>
}

function CreditChart ({ type, usedBacklinks, totalBacklinks, remainingBacklinks }) {
  const textRef = React.useRef(null)

  let roundColor, roundTitle, roundText, roundCredits, roundPercent
  switch (type) {
    case 'remaining':
      roundTitle = 'Remaining'
      roundColor = '#0acf97'
      roundCredits = remainingBacklinks
      break
    case 'total':
      roundTitle = 'Total Purchased'
      roundColor = '#5097ed'
      roundCredits = totalBacklinks
      break
    case 'used':
      roundTitle = 'Used'
      roundColor = '#a6a5a5'
      roundCredits = usedBacklinks
      break
    default:
      roundTitle = ''
      roundCredits = 0
      roundColor = '#545d65'
  }

  roundPercent = (parseInt(roundCredits) * 100) / totalBacklinks

  roundText = `${roundCredits} credits`

  const [containerWidth, setContainerWidth] = React.useState(250)
  const [containerHeight, setContainerHeight] = React.useState(250)
  const [xCanvas, setXCanvas] = React.useState(125)
  const [yCanvas, setYCanvas] = React.useState(125)

  const setColRef = React.useCallback(node => {
    if (node !== null) {
      const colWidth = node.getBoundingClientRect().width,
        colHeight = node.getBoundingClientRect().height
      setContainerWidth(colWidth)
      setContainerHeight(colHeight)

      setXCanvas(colWidth / 2)
      setYCanvas(colHeight / 2)

      if (textRef.current !== null) {
        const textWidth = parseInt(textRef.current.width()) / 2
        textRef.current.offsetX(textWidth - 20)
      }
    }
  }, [type])

  return <Col md={4} id='remainCreditColumn'>
    <div className='circleBox' ref={setColRef}>
      <Stage width={containerWidth} height={containerHeight}>
        <Layer>
          <Arc angle={(360 * roundPercent) / 100} x={xCanvas} y={yCanvas}
               rotation={90} lineJoin='round' lineCap='round'
               innerRadius={yCanvas - 20}
               outerRadius={yCanvas} fill={roundColor}/>
          <Text ref={textRef} x={xCanvas} y={yCanvas} text={roundText}
                align='center' fontStyle='bold' verticalAlign='middle'/>
        </Layer>
      </Stage>
    </div>
    <h5 className='text-center'>{roundTitle}</h5>
  </Col>
}

export default UserCredits