import React from 'react'
import { useAsync } from 'react-async'
import LoadingSpinner from './LoadingSpinner'
import ReloadErrorBlock from './ReloadErrorBlock'

function DataComponent({fetchFn, args, render, addition_props}){
  const {data, error, isPending, reload} = useAsync({
    promiseFn: fetchFn,
    ...args
  })

  if (isPending) return <LoadingSpinner/>

  if (error) return <ReloadErrorBlock reload={reload} error={error}/>

  if(data) {
    return render(data, addition_props)
  } else {
    return <h4>Something went wrong.</h4>
  }
}

export default DataComponent