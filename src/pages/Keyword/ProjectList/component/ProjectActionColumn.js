import React from 'react'
import DeleteProjectButton from './DeleteProjectButton'
import EditProjectButton from './EditProjectButton'
import AddKeywordButton from './AddKeywordButton'

function ProjectActionColumn({projectId}) {
  return (
    <div className='button-list action-columns'>
      <EditProjectButton projectId={projectId}/>
      <DeleteProjectButton projectId={projectId}/>
      <AddKeywordButton projectId={projectId}/>
    </div>
  )
}

export default ProjectActionColumn