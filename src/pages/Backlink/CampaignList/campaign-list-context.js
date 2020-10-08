import React, { createContext, useContext, useReducer } from 'react'

const CampaignListContext = createContext()
CampaignListContext.displayName = 'CampaignListContext'

const CampaignListProvider = ({ reducer, initialState, children }) => (
  <CampaignListContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </CampaignListContext.Provider>
)

const useCampaignListValue = () => {
  const context = useContext(CampaignListContext)
  if (context === undefined) {
    throw new Error(
      `useCampaignListValue must be used within a CampaignListProvider`)
  }
  return context
}

export { CampaignListContext, CampaignListProvider, useCampaignListValue }