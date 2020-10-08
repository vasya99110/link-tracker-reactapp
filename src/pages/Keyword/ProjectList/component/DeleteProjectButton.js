import React from 'react'
import { Button } from 'react-bootstrap'
import ProjectModal from '../../component/ProjectModal'
import { handleAction } from '../../../../utils/api-client'
import { deleteProject } from '../../../../utils/project-client'
import { useProjectListValue } from '../../context/project-list-context'

const doDeleteProject = (projectId, closeModal, refetchProjects) => {
  handleAction({actionFn: deleteProject, successFn: () => {
      refetchProjects()
      closeModal()
    }, data: projectId})
}

function DeleteProjectModal ({projectId, closeModal}) {
  const [{projectFetchCount}, dispatch] = useProjectListValue()
  const refetchProjects = () => dispatch({type: 'fetchProjectList', projectFetchCount: projectFetchCount + 1})

  return (
    <div className='button-list'>
      <Button variant='danger' onClick={() => doDeleteProject(projectId, closeModal, refetchProjects)}>Delete</Button>
      <Button variant='light' onClick={closeModal}>Cancel</Button>
    </div>
  )
}

function DeleteProjectButton ({projectId}) {
  const [showModal, setShowModal] = React.useState(false)
  const openModal = (setShowModal) => setShowModal(true)

  return (
    <>
      <span className='span-button text-danger' onClick={() => openModal(setShowModal)}><i className="mdi mdi-trash-can"></i></span>
      <ProjectModal showModal={showModal} setShowModal={setShowModal}
                    modalId='project-delete-modal'
                    modalTitle='Do you want to delete this project?'
                    render={() => <DeleteProjectModal projectId={projectId}
                      closeModal={() => setShowModal(false)}/>}/>
    </>
  )
}

export default DeleteProjectButton