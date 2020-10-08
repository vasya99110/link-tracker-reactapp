import React from 'react'
import * as Yup from 'yup'
import { handleAction } from '../../utils/api-client'
import { getMozApi, updateMozApi } from '../../utils/user-client'
import { Form, Formik } from 'formik'
import { FormTextInput } from './formhelper'
import { Button } from 'react-bootstrap'
import ButtonSpinner from '../ButtonSpinner'

function MozApiForm ({ userId, handleClose, handleFormUpdated, profileForm }) {
  const [mozAccessId, setMozAccessId] = React.useState('')
  const [mozSecretKey, setMozSecretKey] = React.useState('')

  React.useEffect(() => {
    if(profileForm === true) {
      getMozApi({userId: userId}).then(response => {
        const resData = response.data.data
        setMozAccessId(resData.accessId)
        setMozSecretKey(resData.secretKey)
      })
    }
  })

  return <Formik
    enableReinitialize = {true}
    initialValues={{
      'mozAccessId': mozAccessId,
      'mozSecretKey': mozSecretKey,
      'userId': userId,
    }}
    validationSchema={Yup.object({
      mozAccessId: Yup.string().required('Moz Access Id required'),
      mozSecretKey: Yup.string().required('Moz Secret Key required'),
    })}
    onSubmit={async (values, { setSubmitting }) => {
      return await handleAction({
        actionFn: updateMozApi,
        successFn: () => {
          handleFormUpdated()
          handleClose()
          setSubmitting(false)
        },
        data: values,
      })
    }}
  >
    {({ isSubmitting }) =>
      <Form>
        <h5 className="mb-2 header-title">
          <i className="mdi mdi-chevron-right mr-1"></i> Moz Api
        </h5>
        <input type='hidden' name='userId'/>
        <FormTextInput label='Moz Access Id' name='mozAccessId'
                       type='text'/>
        <FormTextInput label='Moz SecretKey Key' name='mozSecretKey'
                       type='text'/>
        <div className='button-list'>
          <Button variant="primary" type='submit'>
            {isSubmitting ? <ButtonSpinner/> : 'Update'}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Form>
    }
  </Formik>
}

export default MozApiForm