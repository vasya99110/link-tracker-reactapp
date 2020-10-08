import React from 'react'
import { useCampaignDetailValue } from '../../campaign-detail-context'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { handleAction } from '../../../../../utils/api-client'
import {
  archiveBacklink,
  archiveMultipleBacklinks,
  deleteBacklink,
  deleteMultipleBacklinks,
  restoreBacklink,
  restoreMultipleBacklink,
} from '../../../../../utils/backlink-client'

export default function ActionModal (props) {
  const [{ fetchCount }, dispatch] = useCampaignDetailValue()

  function doAction (actionType, actionScope, actionParams, e) {
    e.preventDefault()

    let scopeFn
    switch (actionType) {
      case 'deleteBacklink':
        if (actionScope === 'single') {
          scopeFn = deleteBacklink
        } else if (actionScope === 'multiple') {
          scopeFn = deleteMultipleBacklinks
        }
        break
      case 'archiveBacklink':
        if (actionScope === 'single') {
          scopeFn = archiveBacklink
        } else if (actionScope === 'multiple') {
          scopeFn = archiveMultipleBacklinks
        }
        break
      case 'restoreBacklink':
        if (actionScope === 'single') {
          scopeFn = restoreBacklink
        } else if (actionScope === 'multiple') {
          scopeFn = restoreMultipleBacklink
        }
        break
      default:
        return
    }

    handleAction({ actionFn: scopeFn, data: actionParams }).finally(() => {
      dispatch({ 'type': 'updateFetchCount', 'fetchCount': fetchCount + 1 })
      props.switch()
    })
  }

  return (
    <Modal isOpen={props.open} toggle={props.switch} unmountOnClose={false}
           className={props.className}>
      <ModalHeader
        className={'modal-header modal-colored-header bg-primary'}>{props.modalHeader}</ModalHeader>
      <ModalBody>
        <h3>{props.modalTitle}</h3>
        <div className='button-list'>
          <button type="button" className="btn btn-danger"
                  onClick={(e) => doAction(props.actionType, props.actionScope,
                    props.actionParams, e)}>{props.actionName}</button>
          <button type="button" className="btn btn-light"
                  onClick={props.switch}>Cancel
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}