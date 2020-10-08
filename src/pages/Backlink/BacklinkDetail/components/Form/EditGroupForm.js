import React, { useState } from 'react'
import { useCampaignDetailValue } from '../../campaign-detail-context'
import {
  deleteGroup,
  getGroupById,
  getGroups,
  updateGroup,
  updateGroupListState,
} from '../../../../../utils/group-client'
import { handleAction } from '../../../../../utils/api-client'
import DataComponent from '../../../../../components/DataComponent'
import { Form, Formik } from 'formik'
import {
  FormTextArea,
  FormTextInput,
} from '../../../../../components/Form/formhelper'
import * as Yup from 'yup'
import { useUser } from '../../../../../context/user-context'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

function handleDeleteGroup (
  campaignId,
  userId,
  groupId,
  toggleFn,
  changeCount,
  dispatchFn) {
  handleAction({ actionFn: deleteGroup, data: groupId }).finally(() => {
    getGroups({ campaignId, userId }).then(response => {
        const listGroup = response.data
        dispatchFn({ type: 'updateGroupList', groupList: listGroup })
        dispatchFn(
          { type: 'updateCurrentGroup', currentGroupId: listGroup[0].id })
      },
    )
    toggleFn()
  })
}

function FormView (props) {
  const [{ campaignId, groupChangeCount}, dispatch] = useCampaignDetailValue()
  const user = useUser()
  const [nestedModal, setNestedModal] = useState(false)
  const [closeAll, setCloseAll] = useState(false)
  const toggleNested = () => {
    setNestedModal(!nestedModal)
    setCloseAll(false)
  }

  return <Formik
    initialValues={{
      group_title: props.group.data.title,
      group_description: props.group.data.description ? props.group.data.description : '',
    }}
    validationSchema={Yup.object(
      {
        group_title: Yup.string().required('Group title required'),
      },
    )
    }
    onSubmit={(values, { setSubmitting }) => {
      const groupEditParams = {
        ...values,
        id: props.group.data.id,
        campaign_id: campaignId,
        user_id: user.id,
      }

      handleAction({ actionFn: updateGroup, data: groupEditParams }).finally(
        () => {
          updateGroupListState({campaignId, userId: user.id, switchFn: props.switch, submittingFn: setSubmitting, dispatchFn: dispatch})
        },
      )
    }}
  >
    <Form>
      <FormTextInput label='Group Title' name='group_title' type='text'/>
      <FormTextArea label='Group Description' name="group_description" rows='5'/>
      <div className='button-list'>
        <button className='btn btn-success' type="submit">Save</button>
        {props.group.data.title === 'Default' ? null : (
          <>
            <button className='btn btn-danger' onClick={toggleNested}
                    type="button">Delete
            </button>
            <Modal isOpen={nestedModal} toggle={toggleNested}
                   onClosed={closeAll ? props.switch : undefined}>
              <ModalHeader>Delete Group</ModalHeader>
              <ModalBody>Do you want to delete this group?</ModalBody>
              <ModalFooter>
                <Button color="danger"
                        onClick={(e) => handleDeleteGroup(campaignId, user.id,
                          props.group.data.id,
                          props.switch, groupChangeCount,
                          dispatch)}>Delete</Button>{' '}
                <Button color="secondary" onClick={toggleNested}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </>
        )}

        <button className='btn btn-secondary' type='button'
                onClick={props.switch}>Cancel
        </button>
      </div>
    </Form>
  </Formik>
}

export default function EditGroupForm (props) {
  const [{currentGroupId}] = useCampaignDetailValue()

  return <DataComponent fetchFn={getGroupById} args={{ groupId: currentGroupId, watch: currentGroupId }} render={(data) => <FormView group={data} {...props}/>}/>
}