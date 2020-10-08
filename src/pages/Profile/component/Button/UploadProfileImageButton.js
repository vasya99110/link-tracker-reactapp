import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { uploadProfileImage } from '../../../../utils/user-client'
import ButtonSpinner from '../../../../components/ButtonSpinner'
import ErrorBoundary from '../../../../components/ErrorBoundary'

function UploadProfileImageButton ({ uploadImage, user }) {
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const onUploadFile = (event) => {
    setSelectedFile(event.target.files[0])
  }
  const onClickHandler = () => {
    const data = new FormData()
    data.append('photo', selectedFile)
    data.append('user_id', user.id)

    setUploading(true)
    uploadProfileImage(data).then(response => {
      alert(response.data.success.message)
      uploadImage(response.data.meta.image)
    }).catch(response => {
      alert('There is an server error, please contact administrator)')
      console.log(response)
    }).finally(() => {
      setUploading(false)
      setSelectedFile(null)
      fileInputRef.current.value = null
    })
  }

  return (
    <ErrorBoundary>
      <div className="form-group text-left">
        <label>Upload Image</label>
        <input ref={fileInputRef} type="file" name="photo"
               onChange={(e) => onUploadFile(e)}
               className='form-control-file'/>
        <Button className="btn btn-success btn-block"
                disabled={selectedFile === null}
                onClick={selectedFile !== null ? onClickHandler : null}>
          {uploading === true && <ButtonSpinner/>}{' '}Upload
        </Button>
      </div>
    </ErrorBoundary>
  )
}

export default UploadProfileImageButton