import React, { createContext, useContext, useReducer } from 'react'

const ProjectListContext = createContext()
ProjectListContext.displayName = 'ProjectListContext'

const ProjectListProvider = ({ reducer, initialState, children }) => (
  <ProjectListContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ProjectListContext.Provider>
)

const useProjectListValue = () => {
  const context = useContext(ProjectListContext)
  if (context === undefined) {
    throw new Error(
      `useProjectListValue must be used within a ProjectListProvider`)
  }
  return context
}

export { ProjectListContext, ProjectListProvider, useProjectListValue }