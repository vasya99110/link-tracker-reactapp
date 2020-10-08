import React from 'react'
import { getRegionList } from '../../utils/backlink-client'
import DataComponent from '../DataComponent'
import Select from 'react-select'

const RegionListComponent = ({ region_list,handleChange, setFieldValue, setFieldTouched, name, updateRegion, region  }) => {
  const [currentValue, setCurrentValue] = React.useState({'value': 'google.com','label': 'google.com'})
  const [optionList, setOptionList] = React.useState([])

  const onChange = (e) => {
    setCurrentValue(e)
    setFieldValue(e.value)
    updateRegion(e.value)
    handleChange()
  }

  React.useEffect(() => {
    let optionArr = []

    region_list.data.forEach((item) => {
      optionArr.push({'value': item.toString(),'label': item.toString()})

      if(item.toString() === region.toString()) {
        setCurrentValue({'value': item.toString(),'label': item.toString()})
      }
    })
    setOptionList(optionArr)
  }, [region])

  return (
    <div className='form-group mb-3'>
      <label>Google Region</label>
      <Select options={optionList}
              value={currentValue}
              onBlur={setFieldTouched}
              onChange={onChange}
              name={name}
      />
    </div>
    )
}

function FormRegionList (props) {
  return <DataComponent fetchFn={getRegionList}
                        render={(data) => <RegionListComponent
                        region_list={data} {...props} />}/>
}

export default FormRegionList