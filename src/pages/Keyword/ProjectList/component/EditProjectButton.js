import React from 'react'
import ProjectModal from '../../component/ProjectModal'
import ProjectForm from './ProjectForm'

function EditProjectButton ({projectId}) {
  const [showModal, setShowModal] = React.useState(false)
  const openModal = (setShowModal) => setShowModal(true)

  return (
    <>
      <span className='span-button text-info' onClick={() => openModal(setShowModal)}><i className="mdi mdi-pencil"></i></span>
      <ProjectModal showModal={showModal} setShowModal={setShowModal}
                    modalId='project-delete-modal'
                    modalTitle='Edit Project'
                    render={() => <ProjectForm projectId={projectId} closeModal={() => setShowModal(false)}/>}
                    />
    </>
  )
}

export default EditProjectButton