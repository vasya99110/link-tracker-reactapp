import React from 'react'
import { Card } from 'react-bootstrap'
import ProjectNoteList from './ProjectNoteList'
import { useProjectDetailValue } from '../../context/project-detail-context'

function KeywordNote ({ keywordId }) {
  const [{noteFetchCount}] = useProjectDetailValue()
  return (
    <Card body style={{marginBottom: 0}}>
      {/*<AddProjectNoteButton keywordId={keywordId}/>*/}
      <ProjectNoteList keywordId={keywordId} noteFetchCount={noteFetchCount}/>
    </Card>
  )
}

export default KeywordNote