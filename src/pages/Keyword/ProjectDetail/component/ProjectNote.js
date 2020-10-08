import React from 'react'
import { Card } from 'react-bootstrap'
import AddProjectNoteButton from './Button/AddProjectNoteButton'
import ProjectNoteList from './ProjectNoteList'
import { useProjectDetailValue } from '../../context/project-detail-context'

function ProjectNote ({ projectId }) {
  const [{noteFetchCount}] = useProjectDetailValue()
  return (
    <Card body style={{marginBottom: 0}}>
      <AddProjectNoteButton projectId={projectId}/>
      <ProjectNoteList projectId={projectId} noteFetchCount={noteFetchCount}/>
    </Card>
  )
}

export default ProjectNote