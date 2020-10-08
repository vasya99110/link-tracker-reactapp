import React, { createContext, useContext } from 'react'

const CampaignItemContext = createContext()
CampaignItemContext.displayName = 'CampaignListContext'

const CampaignItemProvider = ({ children }) => {
  return (
    <CampaignItemContext.Provider>
      {children}
    </CampaignItemContext.Provider>
  )
}
const useCampaignItemValue = () => {
  const context = useContext(CampaignItemContext)
  if (context === undefined) {
    throw new Error(
      `useCampaignItemValue must be used within a CampaignListProvider`)
  }
  return context
}

export { CampaignItemContext, useCampaignItemValue, CampaignItemProvider }