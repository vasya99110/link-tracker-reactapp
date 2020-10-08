import React from 'react'
import { Form, Formik } from 'formik'
import { Button, Col, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { FormTextInput } from '../../../../components/Form/formhelper'
import ButtonSpinner from '../../../../components/ButtonSpinner'
import { handleAction } from '../../../../utils/api-client'
import { updateProfile } from '../../../../utils/user-client'
import { useProfileContextValue } from '../../profile-context'

function ProfileForm () {
  const [{ user }, dispatch] = useProfileContextValue()
  return (
    <>
      <h5 className="mb-4 text-uppercase"><i
        className="mdi mdi-account-circle mr-1"></i> Personal Info</h5>
      <Formik
        initialValues={{
          fullName: user.name,
          email: user.email,
        }}
        validationSchema={Yup.object({
          fullName: Yup.string().required('Full name required'),
          email: Yup.string().email('Email invalid').required('Email required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const params = { ...values, userId: user.id }
          return await handleAction({
            actionFn: updateProfile, data: params,
            successFn: () => {
              dispatch({ type: 'updateEmail', email: values.email })
              dispatch({ type: 'updateName', name: values.fullName })
              setSubmitting(false)
            },
          })
        }}>

        {formikProps => (
          <Form>
            <Row>
              <Col>
                <FormTextInput label='Full name' name='fullName' type='text'/>
              </Col>
              <Col>
                <FormTextInput label='Email' name='email' type='email'/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type='submit' disabled={formikProps.isSubmitting}
                        variant="success">{formikProps.isSubmitting &&
                <ButtonSpinner/>} Save</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ProfileForm