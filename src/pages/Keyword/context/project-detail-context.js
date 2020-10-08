import React, { createContext, useContext, useReducer } from 'react'

const ProjectDetailContext = createContext()
ProjectDetailContext.displayName = 'ProjectDetailContext'

const ProjectDetailProvider = ({ reducer, initialState, children }) => (
  <ProjectDetailContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ProjectDetailContext.Provider>
)

const useProjectDetailValue = () => {
  const context = useContext(ProjectDetailContext)
  if (context === undefined) {
    throw new Error(
      `useProjectDetailValue must be used within a ProjectDetailProvider`)
  }
  return context
}

export { ProjectDetailContext, ProjectDetailProvider, useProjectDetailValue }