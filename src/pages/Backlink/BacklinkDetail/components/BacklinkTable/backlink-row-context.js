import React, { useContext, useReducer } from 'react'

const BacklinkRowContext = React.createContext()
BacklinkRowContext.displayName = 'BacklinkRowContext'

export const BacklinkRowProvider = ({ reducer, initialState, children }) => {
  return <BacklinkRowContext.Provider value={useReducer(reducer,
    initialState)}>{children}</BacklinkRowContext.Provider>
}

export const useBacklinkRowValue = () => {
  const context = useContext(BacklinkRowContext)
  if (context === undefined) {
    throw new Error(
      `useBacklinkRowValue must be used within a BacklinkRowProvider`)
  }
  return context
}