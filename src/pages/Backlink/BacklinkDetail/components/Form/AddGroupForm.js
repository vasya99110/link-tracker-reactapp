import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
  FormTextArea,
  FormTextInput,
} from '../../../../../components/Form/formhelper'
import { useCampaignDetailValue } from '../../campaign-detail-context'
import {
  createGroup,
  updateGroupListState,
} from '../../../../../utils/group-client'
import { useUser } from '../../../../../context/user-context'
import { handleAction } from '../../../../../utils/api-client'

export default function AddGroupForm (props) {
  const [{ campaignId }, dispatch] = useCampaignDetailValue()
  const user = useUser(), userId = user.id
  return (
    <Formik
      initialValues={{ group_title: '', group_description: '' }}
      validationSchema={Yup.object(
        {
          group_title: Yup.string().required('Group title required'),
        },
      )
      }
      onSubmit={async (values, { setSubmitting }) => {
        const groupAddParams = {
          ...values,
          campaign_id: campaignId,
          user_id: user.id,
        }
        await handleAction({ actionFn: createGroup, data: groupAddParams }).finally(
          () => {
            updateGroupListState({
              campaignId,
              userId,
              dispatchFn: dispatch,
              switchFn: props.modal_switch,
              submittingFn: setSubmitting,
            })
          },
        )
      }}>
      {formikProps => (
        <Form>
          <FormTextInput label='Group Title' name='group_title' type='text'/>
          <FormTextArea label='Group Description' name="group_description"
                        className="form-control" rows={5}/>
          <div className='button-list'>
            <button className='btn btn-success' type="submit">
              {formikProps.isSubmitting &&
              <span className="spinner-border spinner-border-sm mr-1"
                    role="status"
                    aria-hidden="true"></span>}Submit
            </button>
            <button className='btn btn-secondary' type='button'
                    onClick={props.modal_switch}>Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}