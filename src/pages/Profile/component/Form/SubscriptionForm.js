import React from 'react'
import { createChargebeePortal } from '../../../../utils/user-client'
import { useProfileContextValue } from '../../profile-context'
import { Button } from 'react-bootstrap'

function SubscriptionForm () {
  const [{ user }] = useProfileContextValue()
  let chargebeeInstance = window.Chargebee.getInstance()
  const goToPortal = () => {
    chargebeeInstance.setPortalSession(function () {
      return createChargebeePortal({ userId: user.id, redirectUrl: process.env.REACT_APP_CHARGEBEE_PORTAL_URL })
            .then((response) => response.data.data)
      .catch(function (error) {
        const msg = error.response.data.error.message;
        alert(msg)
      })
    })

    let cbPortal = chargebeeInstance.createChargebeePortal()
    cbPortal.open({
      close () {
        //close callbacks
        console.log('close portal event')
      },
    })
  }

  return (
    <>
      <h5 className="mb-4 text-uppercase"><i
        className="mdi mdi-wallet-membership mr-1"></i> Subscription Setting
      </h5>

      <Button variant='info' block onClick={(e) => goToPortal()}>Enter Subscription Portal</Button>
    </>
  )
}

export default SubscriptionForm