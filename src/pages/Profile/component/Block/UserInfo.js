import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import UploadProfileImageButton from '../Button/UploadProfileImageButton'
import { useProfileContextValue } from '../../profile-context'

function UserInfo () {
  const [{user}, dispatch] = useProfileContextValue()
  const [userImageHash, setUserImageHash] = useState(Date.now())
  const onUploadImage = (image) => {
    dispatch({type: 'updateImage', image: image})
    setUserImageHash(Date.now())
  }

  return (
    <Card className='text-center'>
      <Card.Body>
        <img src={`${user.image}?${userImageHash}`} alt={user.name}
             className="rounded-circle avatar-lg img-thumbnail"/>
        <Card.Title>{user.name}</Card.Title>
        <p className='text-muted font-14'>{user.email}</p>
        <UploadProfileImageButton uploadImage={onUploadImage} user={user}/>
      </Card.Body>
    </Card>
  )
}

export default UserInfo