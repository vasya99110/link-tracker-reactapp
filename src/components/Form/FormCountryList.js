import React from 'react'
import DataComponent from '../DataComponent'
import Select from 'react-select'
import { getCountryList } from '../../utils/backlink-client'

function FormCountryList ({ region, name, handleChange, setFieldTouched, setFieldValue, updateCountryCode, countryCode }) {
  return <DataComponent args={{ region: region, watch: region }}
                        fetchFn={getCountryList}
                        render={data => <FormCountryComponent countryList={data}
                                                              countryCode={countryCode}
                                                              handleChange={handleChange}
                                                              updateCountryCode={updateCountryCode}
                                                              setFieldTouched={setFieldTouched}
                                                              setFieldValue={setFieldValue}
                                                              region={region}
                                                              name={name}/>}
  />
}

function FormCountryComponent ({ countryList, region, name, handleChange,setFieldTouched, setFieldValue, updateCountryCode, countryCode }) {
  const [currentValue, setCurrentValue] = React.useState(
    { 'value': 'US', 'label': 'United States' })
  const [optionList, setOptionList] = React.useState([])

  const updateCountyValue = React.useCallback((countryCode) => {
    setFieldValue(countryCode)
    updateCountryCode(countryCode)
  }, [countryCode])

  const onChange = (e) => {
    setCurrentValue(e)
    updateCountyValue(e.value)
    handleChange()
  }

  React.useEffect(() => {
    const options = countryList.data.map(item => ({
      'value': item.loc_country_iso_code,
      'label': item.loc_name_canonical,
    }))
    setOptionList(options)
  }, [countryList.data])

  React.useEffect(() => {
    if ('google.com' === region) {
      updateCountyValue('US')
      setCurrentValue({ 'value': 'US', 'label': 'United States' })
    } else {
      updateCountyValue(countryList.data[0].loc_country_iso_code)
      setCurrentValue({
        'value': countryList.data[0].loc_country_iso_code,
        'label': countryList.data[0].loc_name_canonical,
      })
    }
  }, [region, countryList.data])


  return <div className='form-group mb-3'>
    <label>Country</label>
    <Select options={optionList}
            onBlur={setFieldTouched}
            onChange={onChange}
            name={name}
            value={currentValue}/>
  </div>
}

export default FormCountryList