import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FormTextInput } from '../../../../components/Form/formhelper'
import { useUser } from '../../../../context/user-context'
import { handleAction } from '../../../../utils/api-client'
import { updatePassword } from '../../../../utils/user-client'

function SecurityForm () {
  const user = useUser()
  const initValues = {
    userId: user.id,
    oldPassword: '',
    password: '',
    passwordConfirm: '',
  }
  return (
    <>
      <h5 className="mb-4 text-uppercase"><i
        className="mdi mdi-security mr-1"></i> Security Setting</h5>
      <Formik
        initialValues={initValues}
        validationSchema={Yup.object({
          oldPassword: Yup.string().required('Old Password Required'),
          password: Yup.string().required('Password Required'),
          passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required('Password Confirm Required'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleAction({actionFn: updatePassword, data: values}).finally(() => {
            resetForm(initValues)
            setSubmitting(false)
          })
        }}>
        <Form>
          <input type='hidden' name='userId'/>
          <FormTextInput label='Old Password' name='oldPassword' type='password'/>
          <FormTextInput label='Password' name='password' type='password'/>
          <FormTextInput label='Confirm Password' name='passwordConfirm'
                         type='password'/>
          <button type='submit' className='btn btn-success'>Save</button>
        </Form>
      </Formik>
    </>
  )
}

export default SecurityForm