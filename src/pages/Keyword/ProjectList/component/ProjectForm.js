import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { Button } from 'react-bootstrap'
import * as Yup from 'yup'
import {
  FormCheckbox,
  FormTextInput,
} from '../../../../components/Form/formhelper'
import FormRegionList from '../../../../components/Form/FormRegionList'
import {
  editProject,
  getProjectById,
  saveProject,
} from '../../../../utils/project-client'
import { useUser } from '../../../../context/user-context'
import { handleAction } from '../../../../utils/api-client'
import { useProjectListValue } from '../../context/project-list-context'
import FormLanguageList from '../../../../components/Form/FormLanguageList'
import ButtonSpinner from '../../../../components/ButtonSpinner'
import FormCountryList from '../../../../components/Form/FormCountryList'
import FormLocationList from '../../../../components/Form/FormLocationList'
import BulkKeywordSection from '../../../../components/BulkKeywordSection'

function ProjectForm ({ closeModal, projectId }) {
  const user = useUser()
  const [{ projectFetchCount }, dispatch] = useProjectListValue()
  const [formRegion, setFormRegion] = useState('google.com')
  const [formCountry, setFormCountry] = useState('us')
  const [formLocation, setFormLocation] = useState('')
  const [bulkImport, setBulkImport] = useState(false)

  const addValues = {
    'projectName': '',
    'projectUrl': '',
    'projectRegion': 'google.com',
    'projectCountry': 'us',
    'projectLocation': '',
    'projectLanguage': 'English',
    'bulkKeywords': '',
    'bulkImport': bulkImport,
    'keywords': [],
  }

  const editValues = {
    'projectName': '',
  }

  const addValidateObject = {
    projectName: Yup.string().required('Project Name required'),
    projectUrl: Yup.string().required('Project Url required'),
    projectRegion: Yup.string().required('Project Region required'),
    projectLanguage: Yup.string().required('Project Language required'),
    projectCountry: Yup.string().required('Project Country required'),
    bulkImport: Yup.boolean(),
    bulkKeywords: Yup.string().when('bulkImport', {
      is: true,
      then: Yup.string().required('Bulk keywords required'),
      otherwise: Yup.string().notRequired()
    }),
    keywords: Yup.array().of(
      Yup.object().shape({
        'content': Yup.string().required('Keyword can not empty'),
      }),
    ).when(
      'bulkImport',
      {
        is: false,
        then: Yup.array().required('Keywords required'),
        otherwise: Yup.array().notRequired()
      },
    )
  }

  const editValidateObject = {
    projectName: Yup.string().required('Project Name required'),
  }

  let validateObject, initValues
  if (projectId === undefined) {
    initValues = addValues
    validateObject = addValidateObject
  } else {
    initValues = editValues
    validateObject = editValidateObject
  }

  const validateSchema = Yup.object(validateObject)
  const [formInitValues, setFormInitValues] = useState(initValues)
  useEffect(() => {
    function updateFormValues (projectId) {
      if (projectId !== undefined) { //get values for project edit
        getProjectById(projectId).then(response => {
          const data = response.data.data
          setFormInitValues({
            'projectName': data.project_name,
          })
          setFormRegion(data.project_region)
        })
      }
    }

    updateFormValues(projectId)
  }, [projectId])

  return (
    <Formik
      validationSchema={validateSchema}
      enableReinitialize={true}
      initialValues={formInitValues}
      onSubmit={async (values, { setSubmitting }) => {
        const params = { userId: user.id, projectId: projectId, ...values }
        const successFn = () => {
          dispatch({
            type: 'fetchProjectList',
            projectFetchCount: projectFetchCount + 1,
          })
          closeModal()
        }

        let backlinkFn = saveProject
        if (projectId !== undefined) {
          backlinkFn = editProject
        }

        await handleAction(
          {
            actionFn: backlinkFn,
            successFn: successFn,
            data: params,
          }).finally(() => {
          setSubmitting(false)
        })
      }}>
      {({ values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        isSubmitting }) =>
        <Form>
          {projectId === undefined ? <>
            <FormTextInput label='Project Name' name='projectName' type='text'/>
            <FormTextInput label='Project Domain' name='projectUrl'/>
            <div className='form-row'>
              <div className='col-md-6'>
                <FormRegionList name='projectRegion'
                                region={formRegion}
                                updateRegion={region => setFormRegion(region)}
                                setFieldValue={value => setFieldValue(
                                  'projectRegion', value, true)}
                                setFieldTouched={() => setFieldTouched(
                                  'backlink_region')}
                                handleChange={() => setFormLocation('')}/>
              </div>
              <div className='col-md-6'>
                <FormLanguageList name='projectLanguage'
                                  formRegion={formRegion}/>
              </div>
            </div>
            <div className='form-row'>
              <div className='col-md-6'>
                <FormCountryList region={formRegion}
                                 name='projectCountry'
                                 setFieldValue={value => setFieldValue(
                                   'projectCountry', value, true)}
                                 setFieldTouched={() => setFieldTouched(
                                   'projectCountry')}
                                 countryCode={formCountry}
                                 updateCountryCode={countryCode => setFormCountry(
                                   countryCode)}
                                 handleChange={() => setFormLocation('')}/>
              </div>
              <div className='col-md-6'>
                <FormLocationList countryId={formCountry}
                                  name='projectLocation'
                                  setFieldValue={value => setFieldValue(
                                    'projectLocation', value, true)}
                                  setFieldTouched={() => setFieldTouched(
                                    'projectLocation')}
                                  currentLocation={formLocation}
                                  updateLocation={location => setFormLocation(
                                    location)}
                />
              </div>
            </div>

            <BulkKeywordSection bulkImport={bulkImport}
                            values={values}
                            touched={touched}
                            errors={errors}/>

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
          </> : <FormTextInput label='Project Name' name='projectName'
                               type='text'/>}

          <div className='button-list'>
            <Button variant='primary' type="submit">{isSubmitting &&
            <ButtonSpinner/>}{' '} Submit</Button>
            <Button variant='light' onClick={closeModal}>Cancel</Button>
          </div>
        </Form>
      }
    </Formik>
  )
}

export default ProjectForm