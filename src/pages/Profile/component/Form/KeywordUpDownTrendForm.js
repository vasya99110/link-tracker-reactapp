import React from 'react'
import { useUser } from '../../../../context/user-context'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FormSelect } from '../../../../components/Form/formhelper'
import {
  getKeywordTrendPeriod,
  saveKeywordTrendPeriod,
} from '../../../../utils/keyword-client'
import { handleAction } from '../../../../utils/api-client'
import ButtonSpinner from '../../../../components/ButtonSpinner'

function KeywordUpDownTrendForm () {
  const user = useUser(), userId = user.id
  const [updateCount, setUpdateCount] = React.useState(0)
  const [reportPeriod, setReportPeriod] = React.useState('weekly')

  React.useEffect(() => {
    const getPeriod = async () => {
      try {
        const periodRes = await getKeywordTrendPeriod({ userId: userId }),
          period = periodRes.data.data
        if(period !== null) {
          setReportPeriod(period)
        }
      } catch (e) {
        console.dir(e)
      }
    }

    getPeriod()
  }, [userId, updateCount])

  return <Formik
    enableReinitialize={true}
    initialValues={{
      'reportPeriod': reportPeriod,
      'userId': userId
    }}
    validationSchema={Yup.object({
      'reportPeriod': Yup.string().required('Report period required'),
    })}
    onSubmit={
      async (values, { setSubmitting }) => {
        handleAction({
          actionFn:saveKeywordTrendPeriod,
          data: values,
          successFn: () => {
            setUpdateCount((count) => count + 1)
            setSubmitting(false)
          }
        })
      }
    }
  >
    {({ isSubmitting }) => <Form>
      <input type='hidden' name='userId'/>
      <FormSelect label='Trending Report Period' name='reportPeriod'>
        <option value='disable'>Disable</option>
        <option value='weekly'>Weekly</option>
        <option value='monthly'>Monthly</option>
      </FormSelect>

      <div className='form-group'>
        <button type='submit' className='btn btn-primary'>{isSubmitting ? <ButtonSpinner/> : ''} Update</button>
      </div>
    </Form>}
  </Formik>
}

export default KeywordUpDownTrendForm