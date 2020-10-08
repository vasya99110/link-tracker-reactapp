import React from 'react'
import { useCampaignDetailValue } from '../campaign-detail-context'
import classNames from 'classnames'
import { Col, Row } from 'react-bootstrap'

const handleChangeGroup = (groupId, dispatchFn) => {
  dispatchFn({ type: 'updateCurrentGroup', currentGroupId: groupId })
}

function GroupListView ({ group_list }) {
  const [{ currentGroupId }, dispatch] = useCampaignDetailValue()

  const listItems = group_list.map((item) => {
    const itemClass = classNames(
      {
        'nav-link': true,
        'active': currentGroupId === item.id,
      },
    )

    return <li key={item.id.toString()} className="nav-item">
      <a href="/" data-toggle="tab" aria-expanded="false"
         className={itemClass}
         style={{ backgroundColor: 'transparent' }}
         onClick={(e) => {
           e.preventDefault()
           handleChangeGroup(item.id, dispatch, e)
         }}>
        {item.title}
      </a>
    </li>
  })

  return <Row className={'mb-2'}>
    <Col>
      <ul className="nav nav-tabs nav-bordered">{listItems}</ul>
    </Col>
  </Row>
}

function GroupListRow (props) {
  return <GroupListView {...props}/>
}

export default GroupListRow