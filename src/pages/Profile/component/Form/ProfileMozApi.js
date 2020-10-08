import React from 'react'
import MozApiForm from '../../../../components/Form/MozApiForm'
import { useUser } from '../../../../context/user-context'

function ProfileMozApi () {
  const user = useUser(), userId = user.id
  return <MozApiForm userId={userId} handleFormUpdated={() => console.log('empty form')}
                     profileForm={true}
                     handleClose={() => console.log('empty form')}/>
}

export default ProfileMozApi