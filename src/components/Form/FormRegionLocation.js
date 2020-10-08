import React from 'react'
import FormRegionList from './FormRegionList'
import FormCountryList from './FormCountryList'
import FormLocationList from './FormLocationList'

export default function FormRegionLocation(){
  return <>
    <FormRegionList name='projectRegion'
                    region={formRegion}
                    updateRegion={region => setFormRegion(region)}
                    setFieldValue={value => setFieldValue(
                      'projectRegion', value, true)}
                    setFieldTouched={() => setFieldTouched(
                      'backlink_region')}
                    handleChange={() => setFormLocation('')}/>

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
  </>
}