import React from 'react'
import { FormSelect } from './formhelper'
import { getLanguageList } from '../../utils/backlink-client'
import DataComponent from '../DataComponent'

const LanguageListComponent = ({language_list, name}) => {
  const optionList = language_list.data.map(item => {
    return <option key={item.toString()} value={item}>{item}</option>
  })

  return (
    <FormSelect label='Google Language' name={ name || 'backlink_language'}>
      <option value=''>Select a language</option>
      {optionList}
    </FormSelect>
  )
}

function FormLanguageList({formRegion, name}) {
  return <DataComponent fetchFn={getLanguageList}
                        args={{ region: formRegion, watch: formRegion }}
                        render={(data) => <LanguageListComponent name={name}
                          language_list={data}/>}/>
}

export default FormLanguageList