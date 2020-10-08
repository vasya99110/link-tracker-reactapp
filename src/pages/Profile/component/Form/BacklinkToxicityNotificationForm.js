import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useUser } from '../../../../context/user-context'
import { FormSelect } from '../../../../components/Form/formhelper'
import ButtonSpinner from '../../../../components/ButtonSpinner'
import { Button } from 'react-bootstrap'
import { handleAction } from '../../../../utils/api-client'
import { getToxicAlert, updateToxicAlert } from '../../../../utils/user-client'

function BacklinkToxicityNotificationForm () {
  const user = useUser(), userId = user.id
  const [updateCount, setUpdateCount] = React.useState(0)
  const [toxicAlert, setToxicAlert] = React.useState('completed')

  React.useEffect(() => {
    const fetchAlert = async () => {
      try {
        const response = await getToxicAlert({ userId: userId }),
          toxicAlert = null === response.data.data
            ? 'completed'
            : response.data.data

        return setToxicAlert(toxicAlert)
      } catch (e) {
        console.dir(e)
      }
    }

    fetchAlert()
  }, [updateCount, toxicAlert])

  return <Formik
    enableReinitialize={true}
    initialValues={{
      'toxicAlert': 'completed',
      'userId': userId,
    }}
    validationSchema={Yup.object({
      'toxicAlert': Yup.string().required('You must select an option'),
    })}
    onSubmit={
      async (values, { setSubmitting }) => {
        handleAction({
          actionFn: updateToxicAlert,
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
        className="mdi mdi-chevron-right mr-1"></i> Backlink Toxicity Alert</h5>
      <FormSelect label='Toxicity Alert' name='toxicAlert'>
        <option value='disable'>Disable</option>
        <option value='completed'>When a backlink toxicity period has been
          completed (Whatever the result)
        </option>
        <option value='completed_toxic'>When a backlink toxicity period has been
          completed and is toxic.
        </option>
      </FormSelect>

      <div className='form-group'>
        <Button variant='info' type='submit'>
          {isSubmitting ? <ButtonSpinner/> : ''} Save</Button>
      </div>
    </Form>}
  </Formik>
}

export default BacklinkToxicityNotificationForm