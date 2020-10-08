import React from 'react'
// import AsyncSelect from 'react-select/async'
import AsyncPaginate from 'react-select-async-paginate'
import * as API from './../../utils/API'

async function loadAsyncOptions(countryCode,inputValue, loadedOptions) {
  try {
    const response = await API.get(
      `/api/backlinks/locations/${countryCode}`,
      {
        params: {
          search: inputValue,
          offset: loadedOptions.length
        },
        // timeout: 500
      }).then(response => response.data)

    const hasMore = response.meta.countRecords > loadedOptions.length + 10;
    const responseData = response.data.map(
      item => ({
        'value': item.loc_name_canonical,
        'label': item.loc_name_canonical,
      }))

    return {
      options: responseData,
      hasMore: hasMore,
    }
  } catch (e) {
    console.log(e)
  }
}

const shouldLoadMore = (scrollHeight, clientHeight, scrollTop) => {
  const bottomBorder = (scrollHeight - clientHeight) / 2;

  return bottomBorder < scrollTop;
};

// const increase = numberOfRequests => numberOfRequests + 1;

function FormLocationList ({ countryId, name, updateLocation, currentLocation, setFieldValue, setFieldTouched }) {
  // const [numberOfRequests, setNumberOfRequests] = React.useState(0);
  const [countryCode, setCountryCode] = React.useState('US')
  const [currentValue, setCurrentValue] = React.useState({'value': '','label': ''})

  const onChange = (e) => {
      const value = (e !== null && e.value !== null) ? e.value : null
      setFieldValue(value)
      updateLocation(value)
      setCurrentValue(e)
  }

  React.useEffect(() => {
    setCountryCode(countryId)
  },[countryId])

  React.useEffect(() => {
    setCurrentValue({'value': currentLocation,'label': currentLocation})
  }, [currentLocation])

  const wrappedLoadOptions = (...args) => {
    // setNumberOfRequests(increase);
    return loadAsyncOptions(countryCode, ...args);
  };

  return <div className='form-group mb-3'>
    <label>Location</label>
    <AsyncPaginate
      isClearable={true}
      name={name}
      defaultOptions
      cacheUniq={countryId}
      debounceTimeout={300}
      loadOptions={wrappedLoadOptions}
      shouldLoadMore={shouldLoadMore}
      onBlur={setFieldTouched}
      onChange={onChange}
      value={currentValue}
    />
  </div>
}

export default FormLocationList