import React from 'react'
import GraphAction from './Items/GraphAction'
import DotDropDownButton from '../../../../../../components/DotDropDownButton'
import EditAction from './Items/EditAction'
import DeleteAction from './Items/DeleteAction'
import ArchiveAction from './Items/ArchiveAction'
import ActionTooltip from './ActionTooltip'
import RestoreAction from './Items/RestoreAction'
import DeletePernmanentAction from './Items/DeletePernmanentAction'

export default function TableAction (props) {
  const backlinkStatus = props.status
  let btnList = []

  if('active' === backlinkStatus) {
    btnList = [
      <GraphAction key="viewGraph" test_id={props.test_id}/>,
      <EditAction key="editBacklink" test_id={props.test_id}/>,
      <DeleteAction key="deleteBacklink" test_id={props.test_id}/>,
      <ArchiveAction key="archiveBacklink" test_id={props.test_id}/>,
      <ActionTooltip key="backlinkNote" tooltip_type='note' {...props}>
        <a href="/#" className="action-icon"
           onClick={(e) => {e.preventDefault()}}> <i
          className="mdi mdi-file-document"></i></a>
      </ActionTooltip>
      ]
  } else if ('trashed' === backlinkStatus) {
    btnList = [
      <RestoreAction key="restoreBacklink" test_id={props.test_id}/>,
      <DeletePernmanentAction key="deleteBacklinkPermanent" test_id={props.test_id}/>
    ]
  } else if ('archived' === backlinkStatus) {
    btnList = [<RestoreAction key="restoreBacklink" test_id={props.test_id}/>]
  }

  return <DotDropDownButton itemList={btnList}>
              <span><i
                className="dot-dropdown-link mdi mdi-dots-vertical"/></span>
  </DotDropDownButton>
}