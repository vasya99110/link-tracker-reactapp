import React, { createContext, useContext, useReducer } from 'react'

const BacklinkTableContext = createContext()
BacklinkTableContext.displayName = 'BacklinkTableContext'

const BacklinkTableProvider = ({ reducer, initialState, children }) => (
  <BacklinkTableContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </BacklinkTableContext.Provider>
)

const useBacklinkTableValue = () => {
  const context = useContext(BacklinkTableContext)
  if (context === undefined) {
    throw new Error(
      `useBacklinkTableValue must be used within a BacklinkTableProvider`)
  }
  return context
}

export { BacklinkTableContext, BacklinkTableProvider, useBacklinkTableValue }