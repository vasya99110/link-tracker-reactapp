import React from 'react'
import { Button } from 'react-bootstrap'
import ProjectForm from './ProjectForm'
import ProjectModal from '../../component/ProjectModal'

function CreateProjectButton () {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <>
      <Button variant='danger' className='btn-rounded mb-3'
              onClick={() => setShowModal(true)}><i
        className="mdi mdi-plus"></i>{' '}Create Project</Button>
      <ProjectModal showModal={showModal} setShowModal={setShowModal}
                    modalId='project-delete-modal'
                    modalTitle='Create Project'
                    render={() => <ProjectForm closeModal={() => setShowModal(false)} />}

      />
    </>
  )
}

export default CreateProjectButton