import React, { createContext, useContext, useReducer } from 'react'

const CampaignDetailContext = createContext()
CampaignDetailContext.displayName = 'CampaignDetailContext'

const CampaignDetailProvider = ({ reducer, initialState, children }) => {
  return <CampaignDetailContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </CampaignDetailContext.Provider>
}

const useCampaignDetailValue = () => {
  const context = useContext(CampaignDetailContext)
  if (context === undefined) {
    throw new Error(
      `useCampaignDetailValue must be used within a CampaignListProvider`)
  }
  return context
}

export { CampaignDetailProvider, useCampaignDetailValue }

