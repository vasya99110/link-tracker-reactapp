import React, { createContext, useContext, useReducer } from 'react'

const ProfileContext = createContext()
ProfileContext.displayName = 'ProfileContext'

const ProfileContextProvider = ({ reducer, initialState, children }) => (
  <ProfileContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ProfileContext.Provider>
)

const useProfileContextValue = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error(
      `useProfileContextValue must be used within a ProfileContextProvider`)
  }
  return context
}

export { ProfileContext, ProfileContextProvider, useProfileContextValue }