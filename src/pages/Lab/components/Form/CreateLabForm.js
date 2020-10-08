import React, { useState } from 'react'
import {
  FormCheckbox,
  FormTextArea,
  FormTextInput,
} from '../../../../components/Form/formhelper'
import { Form, Formik } from 'formik'
import moment from 'moment'
import FormRegionList from '../../../../components/Form/FormRegionList'
import * as Yup from 'yup'
import FormLanguageList from '../../../../components/Form/FormLanguageList'
import FormCountryList from '../../../../components/Form/FormCountryList'
import FormLocationList from '../../../../components/Form/FormLocationList'
import BulkKeywordSection from '../../../../components/BulkKeywordSection'
import { Button } from 'react-bootstrap'
import ButtonSpinner from '../../../../components/ButtonSpinner'
import { handleAction } from '../../../../utils/api-client'
import { saveLab } from '../../../../utils/lab-client'
import { useUser } from '../../../../context/user-context'

function CreateLabForm ({handleClose}) {
  const user = useUser()
  const [labRegion, setLabRegion] = React.useState('google.com')
  const [labCountry, setLabCountry] = React.useState('us')
  const [labLocation, setLabLocation] = React.useState('')
  const [bulkImport, setBulkImport] = useState(false)

  const initValues = {
    'labName': '',
    'startDate': '',
    'endDate': '',
    'labDomain': '',
    'labRegion': 'google.com',
    'labLanguage': 'English',
    'labCountry': 'US',
    'labLocation': '',
    'labNote': '',
    'bulkKeywords': '',
    'bulkImport': bulkImport,
    'keywords': [],
  }

  return <Formik initialValues={initValues}
                 validationSchema={Yup.object({
                   labName: Yup.string().required('Please enter lab name'),
                   startDate: Yup.date()
                     .min(new Date().toDateString())
                     .required('Please set lab start date'),
                   endDate: Yup.date()
                     .when('startDate', (startDateValue, schema) => {
                       if(startDateValue !== undefined) {
                         const startDate = moment(startDateValue)
                         const minEndDate = moment(startDate)
                           .add(1, 'd')

                         return schema.min(minEndDate.format('YYYY-MM-DD'))
                       }
                     })
                     .required('Please set lab end date'),
                   labDomain: Yup.string().required('Please enter lab domain'),
                   labRegion: Yup.string().required('Please choose lab region'),
                   labLanguage: Yup.string()
                     .required('Please choose lab language'),
                   labCountry: Yup.string()
                     .required('Please choose lab country'),
                   bulkImport: Yup.boolean(),
                   bulkKeywords: Yup.string().when('bulkImport', {
                     is: true,
                     then: Yup.string().required('Bulk keywords required'),
                     otherwise: Yup.string().notRequired(),
                   }),
                   keywords: Yup.array().of(
                     Yup.object().shape({
                       'content': Yup.string()
                         .required('Keyword can not empty'),
                     }),
                   ).when(
                     'bulkImport',
                     {
                       is: false,
                       then: Yup.array().required('Keywords required'),
                       otherwise: Yup.array().notRequired(),
                     },
                   ),
                 })}
                 onSubmit={async (values, { setSubmitting }) => {
                   const params = { userId: user.id, ...values }
                   const jsonValues = JSON.stringify(params, null, 2)
                   console.log('submit values', jsonValues)

                   await handleAction(
                     {
                       actionFn: saveLab,
                       successFn: handleClose,
                       data: params,
                     }).finally(() => {
                     setSubmitting(false)
                   })
                 }}>
    {
      ({
        isSubmitting,
        values,
        touched,
        setFieldTouched,
        setFieldValue,
        errors,
      }) => <Form>
        <div className='form-row'>
          <div className='col-md-6'>
            <FormTextInput type='text' label='Lab Name' name='labName'/>
          </div>
          <div className='col-md-6'>
            <FormTextInput type='url' label='Lab Domain' name='labDomain'/>
          </div>
        </div>

        <div className='form-row'>
          <div className='col-md-6'>
            <FormTextInput type='date' name='startDate' label='Start Date'
                           min={moment().format('YYYY-MM-DD')}/>
          </div>
          <div className='col-md-6'>
            <FormTextInput type='date' name='endDate' label='End Date'
                           min={moment().format('YYYY-MM-DD')}/>
          </div>
        </div>

        <div className='form-row'>
          <div className='col-md-12'>
            <FormTextArea name='labNote' label='Note'/>
          </div>
        </div>

        <div className='form-row'>
          <div className='col-md-6'>
            <FormRegionList name='labRegion'
                            region={labRegion}
                            updateRegion={region => setLabRegion(region)}
                            setFieldValue={value => setFieldValue(
                              'labRegion', value, true)}
                            setFieldTouched={() => setFieldTouched(
                              'labRegion')}
                            handleChange={() => setLabLocation('')}/>
          </div>
          <div className='col-md-6'>
            <FormLanguageList name='labLanguage'
                              formRegion={labRegion}/>
          </div>
        </div>

        <div className='form-row'>
          <div className='col-md-6'>
            <FormCountryList region={labRegion}
                             name='labCountry'
                             setFieldValue={value => setFieldValue(
                               'labCountry', value, true)}
                             setFieldTouched={() => setFieldTouched(
                               'labCountry')}
                             countryCode={labCountry}
                             updateCountryCode={countryCode => setLabCountry(
                               countryCode)}
                             handleChange={() => setLabLocation('')}/>
          </div>
          <div className='col-md-6'>
            <FormLocationList countryId={labCountry}
                              name='labLocation'
                              setFieldValue={value => setFieldValue(
                                'labLocation', value, true)}
                              setFieldTouched={() => setFieldTouched(
                                'labLocation')}
                              currentLocation={labLocation}
                              updateLocation={location => setLabLocation(
                                location)}
            />
          </div>
        </div>

        <div className='form-row'>
          <div className='col-md-12'>
            <BulkKeywordSection bulkImport={bulkImport}
                                values={values}
                                touched={touched}
                                errors={errors}/>
          </div>
          <div className='col-md-12'>
            <FormCheckbox name='bulkImport' type='checkbox'
                          checked={bulkImport}
                          onClick={() => {
                            if (bulkImport === false) {
                              setFieldValue('keywords', [])
                            }
                            setBulkImport(prevBulk => !prevBulk)
                          }}>
              Bulk Import
            </FormCheckbox>
          </div>
        </div>
        <div className='button-list'>
          <Button variant='primary' type="submit">{isSubmitting &&
          <ButtonSpinner/>}{' '} Submit</Button>
          <Button variant='light' onClick={handleClose}>Cancel</Button>
        </div>
      </Form>
    }
  </Formik>
}

export default CreateLabForm