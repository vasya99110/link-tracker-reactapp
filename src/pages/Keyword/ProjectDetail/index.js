import React from 'react'
import ProjectDetailView from './component/ProjectDetailView'
import ProjectPerformanceChart from './component/Chart/ProjectPerformanceChart'
import ProjectNote from './component/ProjectNote'

function ProjectDetail ({projectId}) {
  return (
    <>
      <ProjectDetailView projectId={projectId}/>
      <ProjectPerformanceChart projectId={projectId}/>
      <ProjectNote projectId={projectId}/>
    </>
  )
}

export default ProjectDetail