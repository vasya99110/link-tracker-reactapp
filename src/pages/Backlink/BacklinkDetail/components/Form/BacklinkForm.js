import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
  FormCheckbox,
  FormSelect,
  FormTextArea,
  FormTextInput,
} from '../../../../../components/Form/formhelper'
import {
  createBacklink,
  editBacklink,
  getBacklinkById,
} from '../../../../../utils/backlink-client'
import { useCampaignDetailValue } from '../../campaign-detail-context'
import { useUser } from '../../../../../context/user-context'
import ButtonSpinner from '../../../../../components/ButtonSpinner'
import FormRegionList from '../../../../../components/Form/FormRegionList'
import FormLanguageList from '../../../../../components/Form/FormLanguageList'
import FormCountryList from '../../../../../components/Form/FormCountryList'
import FormLocationList from '../../../../../components/Form/FormLocationList'
import { handleAction } from '../../../../../utils/api-client'

const createGroupOptions = (groupList) => {
  return groupList.map(item => {
    return <option key={item.id.toString()}
                   value={item.id}>{item.title}</option>
  })
}

function BacklinkForm ({ formType, modalSwitch, testId }) {
  const [{ groupList, fetchCount }, dispatch] = useCampaignDetailValue()
  const user = useUser(), userId = user.id
  const [formRegion, setFormRegion] = useState('google.com')
  const [formCountry, setFormCountry] = useState('US')
  const [formLocation, setFormLocation] = useState('')

  let groupDefaultId = null;
  groupList.forEach(function(item) {
    if(item.title === 'Default') {
      groupDefaultId = item.id
    }
  })

  const initValues = {
    test_id: testId,
    backlink_url: '',
    backlink_keyword: '',
    backlink_country: 'US',
    backlink_location: '',
    backlink_region: 'google.com',
    backlink_language: 'English',
    backlink_group: groupDefaultId,
    target_url: '',
    note: '',
    deleteHistory: false,
  }
  const [formInitValues, setFormInitValues] = useState(initValues)

  useEffect(() => {
    function updateFormType (formType) {
      if (formType === 'edit' && testId !== undefined) {
        getBacklinkById(testId).then(response => {
          const data = response.data, backlinkData = data.data
          setFormInitValues({
            test_id: backlinkData.id,
            backlink_url: backlinkData.article_url,
            backlink_keyword: backlinkData.keyword,
            backlink_region: backlinkData.region,
            // backlink_country: backlinkData.country,
            backlink_language: backlinkData.language,
            backlink_group: backlinkData.network.id,
            target_url: backlinkData.target_url,
            note: backlinkData.note == null ? '' : backlinkData.note,
            deleteHistory: false,
          })
          setFormRegion(backlinkData.region)
        })
      }
    }

    updateFormType(formType)
  }, [formType, testId])

  const backlinkSchema = Yup.object({
    backlink_url: Yup.string().url('Must be url').required('Backlink required'),
    backlink_keyword: Yup.string().required('Keyword required'),
    backlink_region: Yup.string().required('Region required'),
    backlink_country: Yup.string().required('Country required'),
    backlink_language: Yup.string().required('Language required'),
    backlink_group: Yup.number().required('Group required'),
    target_url: Yup.string().url('Must be url').required('Target Url required'),
  })
  return (
    <Formik
      enableReinitialize={true}
      initialValues={formInitValues}
      validationSchema={backlinkSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const submitParams = {
          ...values, user_id: userId,
        }

        let actionFn = createBacklink
        if (formType === 'edit') {
          actionFn = editBacklink
        }

        const successFn = () => {
          dispatch({ 'type': 'updateFetchCount', 'fetchCount': fetchCount + 1 })
          modalSwitch()
        }

        /*setTimeout(() => {
          alert(JSON.stringify(submitParams, null, 2))
          setSubmitting(false)
        }, 400)
        return false*/

        await handleAction({
          actionFn,
          successFn,
          data: submitParams,
          showAlert: false
        }).finally(() => setSubmitting(false))
      }}
    >
      {formikProps => (
        <Form>
          <input type='hidden' name='test_id'/>
          <div className={'form-row'}>
            <div className="col-md-6">
              <FormTextInput label='Backlink URL' name='backlink_url'
                             type='text'/>
            </div>
            <div className="col-md-6">
              <FormTextInput label='Anchor Text' name='backlink_keyword'
                             type='text'/>
            </div>
          </div>

          <div className={'form-row'}>
            <div className="col-md-6">
              <FormRegionList name='backlink_region'
                              region={formRegion}
                              updateRegion={region => setFormRegion(region)}
                              setFieldValue={value => formikProps.setFieldValue(
                                'backlink_region', value, true)}
                              setFieldTouched={() => formikProps.setFieldTouched(
                                'backlink_region')}
                              handleChange={() => {setFormLocation('')}}
              />
            </div>
            <div className="col-md-6">
              <FormLanguageList formRegion={formRegion}/>
            </div>
          </div>

          <div className='form-row'>
            <div className='col-md-6'>
              <FormCountryList region={formRegion}
                               name='backlink_country'
                               setFieldValue={value => formikProps.setFieldValue(
                                 'backlink_country', value, true)}
                               setFieldTouched={() => formikProps.setFieldTouched(
                                 'backlink_country')}
                               countryCode={formCountry}
                               updateCountryCode={countryCode => setFormCountry(
                                 countryCode)}
                               handleChange={() => setFormLocation('')}/>
            </div>
            <div className='col-md-6'>
              <FormLocationList countryId={formCountry}
                                name='backlink_location'
                                setFieldValue={value => formikProps.setFieldValue(
                                  'backlink_location', value, true)}
                                setFieldTouched={() => formikProps.setFieldTouched(
                                  'backlink_location')}
                                currentLocation={formLocation}
                                updateLocation={location => setFormLocation(
                                  location)}
              />
            </div>
          </div>

          <div className='form-row'>
            <div className='col-md-6'>
              <FormSelect label='Group'
                          name='backlink_group'>
                {createGroupOptions(groupList)}
              </FormSelect>
            </div>
            <div className='col-md-6'>
              <FormTextInput label='Target Url' name='target_url' type='text'/>
            </div>
          </div>

          <div className='form-row'>
            <div className='col-md-12'>
              <FormTextArea label='Note' name='note' rows={5}/>
            </div>
          </div>

          {formType === 'edit' &&
          <FormCheckbox name="deleteHistory">
            Do you want to delete ranking history?
          </FormCheckbox>}
          <div className='button-list'>
            <button className='btn btn-success' type="submit">
              {formikProps.isSubmitting && <ButtonSpinner/>}
              Save
            </button>
            <button className='btn btn-secondary' type='button'
                    onClick={modalSwitch}>Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default BacklinkForm