import React, { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()
AppContext.displayName = 'AppContext'

const AppContextProvider = ({ reducer, initialState, children }) => (
  <AppContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AppContext.Provider>
)

const useAppContextValue = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error(
      `useAppContextValue must be used within a AppContextProvider`)
  }
  return context
}

export { AppContext, AppContextProvider, useAppContextValue }