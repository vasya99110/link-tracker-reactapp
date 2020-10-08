import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { handleAction } from '../../../../utils/api-client'
import ButtonSpinner from '../../../../components/ButtonSpinner'
import { FormTextInput } from '../../../../components/Form/formhelper'
import { useUser } from '../../../../context/user-context'
import {
  getKeywordDropOptions,
  saveKeywordOption,
} from '../../../../utils/keyword-client'

function KeywordRankingDropForm () {
  const user = useUser(), userId = user.id
  const [rankingDrop, setRankingDrop] = React.useState(30)
  const [dropPeriod, setDropPeriod] = React.useState(7)
  const [updateCount, setUpdateCount] = React.useState(0)

  React.useEffect(() => {
    const setOptions = async (userId) => {
      const keywordOptionRes = await getKeywordDropOptions({userId: userId}),
        keywordOptions = keywordOptionRes.data.data

      setRankingDrop(keywordOptions.rankingDrop)
      setDropPeriod(keywordOptions.dropPeriod)

      return true;
    }

    setOptions(userId)
  }, [userId])
  return <Formik
    enableReinitialize={true}
    initialValues={
      {
        'userId': userId,
        'rankingDrop': rankingDrop,
        'dropPeriod': dropPeriod,
      }}
    validationSchema={Yup.object({
      'userId': Yup.string().required('User Id required'),
      'rankingDrop': Yup.number()
        .min(1)
        .positive('Ranking drop must be higher than zero')
        .integer('Ranking drop must be integer')
        .required('Ranking drop required'),
      'dropPeriod': Yup.number()
        .min(1)
        .positive('Drop Period must be higher than zero')
        .integer('Drop Period must be integer')
        .required('Drop Period required'),
    })}
    onSubmit={
      async (values, { setSubmitting }) => {
        handleAction({
          actionFn: saveKeywordOption,
          data: values,
          successFn: () => {
            setUpdateCount((prevCount) => prevCount++)
            setSubmitting(false)
          }
        })
      }
    }
  >
    {({isSubmitting}) => <Form>
      <h4>Ranking Drop Email Report</h4>
      <input type='hidden' name='userId'/>
      <FormTextInput label='Ranking Drop (Percentage)' name='rankingDrop' type='number'/>
      <FormTextInput label='Compare Ranking Drop Period (Days)' name='dropPeriod' type='number'/>

      <div className='form-group'>
        <button type='submit' className='btn btn-primary'>
          {isSubmitting ? <ButtonSpinner/> : ''} Update
        </button>
      </div>
    </Form>}
  </Formik>
}

export default KeywordRankingDropForm