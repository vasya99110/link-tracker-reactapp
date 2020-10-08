import React from 'react'
import LabModal from './LabModal'
import CreateLabForm from '../Form/CreateLabForm'

function CreateLabModal () {
  return <LabModal btnTitle='Create Lab' modalTitle='Create Lab' render={(props) => {
    return <CreateLabForm {...props}/>
  }}/>
}

export default CreateLabModal