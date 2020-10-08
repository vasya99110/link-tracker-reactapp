import React from 'react'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import classNames from 'classnames'
import { addCampaign, editCampaign } from './../../../../utils/campaign-client'
import { useUser } from './../../../../context/user-context'
import { useCampaignListValue } from '../campaign-list-context'

function CampaignForm (props) {
  const user = useUser()
  const [, dispatch] = useCampaignListValue()
  const formType = props.type
  const addSchema = Yup.object().shape({
    campaign_name: Yup.string().required('Name required')
  })

  let formInitValues = {
    campaign_name: '',
    campaign_description: '',
    user_id: user.id,
  }

  if (formType === 'edit') {
    formInitValues = {
      campaign_name: props.campaign_detail.campaign_name,
      campaign_description: props.campaign_detail.campaign_description,
    }
  }

  return (
    <Formik
      initialValues={formInitValues}
      validationSchema={addSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (formType === 'edit') {
          editCampaign(props.campaign_id, values).then((response) => {
            alert(response.data.message)
            props.update_count()
          }).catch((error) => {
            if (error.response) {
              const errorData = error.response.data,
                errorFields = errorData.errors
              alert(errorFields.campaign_name[0])
            } else {
              console.dir(error)
            }
          })
        } else if (formType === 'add') {
          addCampaign(values).then((response) => {
            alert(response.data.message)
            dispatch({
              'type': 'campaignListChange',
              'campaignListCount': response.data.meta.campaign_id,
            })
          }).catch((error) => {
            if (error.response) {
              const errorData = error.response.data,
                errorFields = errorData.errors
              alert(errorFields.campaign_name[0])
            } else {
              console.dir(error)
            }
          })
        }

        setSubmitting(false)
      }}
      render={(formikProps) => (
        <Form>
          {props.children}
          <Field type='hidden' name='user_id'/>
          <div className="form-group">
            <label htmlFor="campaignName">Campaign Name</label>
            <Field component="input" className={'form-control'} type="text"
                   name="campaign_name" id="campaignName"
                   placeholder="Campaign Name"/>
            <ErrorMessage name="campaign_name" component="span"
                          className="text-danger"/>
          </div>
          <div className="form-group">
            <label htmlFor="campaignDescription">Campaign Description</label>
            <Field component="input" className={'form-control'} type="text"
                   name="campaign_description" id="campaignDescription"
                   placeholder="Campaign Description"/>
            <ErrorMessage name="campaign_description" component="span"
                          className="text-danger"/>
          </div>
          <div className="form-group">
            <button type='submit' className={classNames({
              'btn': true,
              'btn-success': !formikProps.isSubmitting,
              'btn-outline-success': formikProps.isSubmitting,
            })} disabled={formikProps.isSubmitting}>Save
            </button>
            {' '}
            <button type='button' className="btn btn-secondary"
                    onClick={props.switch}>Cancel
            </button>
          </div>
        </Form>
      )}
    />
  )
}

export default CampaignForm