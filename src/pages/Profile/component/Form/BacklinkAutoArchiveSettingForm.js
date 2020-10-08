import React from 'react'
import { Form, Formik, isInteger } from 'formik'
import * as Yup from 'yup'
import { FormTextInput } from '../../../../components/Form/formhelper'
import { Button } from 'react-bootstrap'
import ButtonSpinner from '../../../../components/ButtonSpinner'
import { useUser } from '../../../../context/user-context'
import {
  getArchiveDays,
  updateArchiveDays,
} from '../../../../utils/user-client'
import { handleAction } from '../../../../utils/api-client'

function BacklinkAutoArchiveSettingForm () {
  const user = useUser(), userId = user.id
  const [updateCount, setUpdateCount] = React.useState(0)
  const [archiveDays, setArchiveDays] = React.useState(60)

  React.useEffect(() => {
    const getArchive = async () => {
      try {
        const archiveResponse = await getArchiveDays({ userId: userId }),
          archiveDays = archiveResponse.data.data

        if (isInteger(archiveDays)) {
          setArchiveDays(archiveDays)
        }
      } catch (e) {
        console.dir(e)
      }
    }

    getArchive()
  }, [updateCount])

  return <Formik
    enableReinitialize={true}
    initialValues={{
      'archiveDays': archiveDays,
      'userId': userId,
    }}
    validationSchema={Yup.object({
      'archiveDays': Yup.number()
        .min(0)
        // .positive('Days must be positive')
        .integer('Days must be integer')
        .required('Archive days required'),
    })}
    onSubmit={
      async (values, { setSubmitting }) => {
        handleAction({
          actionFn: updateArchiveDays,
          data: values,
          successFn: () => {
            setUpdateCount((count) => count + 1)
            return setSubmitting(false)
          },
        })
      }
    }
  >
    {({ isSubmitting }) => <Form>
      <input type='hidden' name='userId'/>
      <h5 className="mb-2 header-title"><i
        className="mdi mdi-chevron-right mr-1"></i> Auto Archive After X Days</h5>
      <small>Set to 0 to disable it</small>
      <FormTextInput label='' name='archiveDays' type='number'/>

      <div className='form-group'>
        <Button variant='info' type='submit'>
          {isSubmitting ? <ButtonSpinner/> : ''} Save</Button>
      </div>
    </Form>}
  </Formik>
}

export default BacklinkAutoArchiveSettingForm