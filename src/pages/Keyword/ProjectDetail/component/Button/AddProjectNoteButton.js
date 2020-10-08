import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from 'react-bootstrap'
import ProjectModal from '../../../component/ProjectModal'
import NoteForm from '../Form/NoteForm'

function AddProjectNoteButton ({ projectId, keywordId, className }) {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <>
      <Button variant='danger' onClick={() => setShowModal(true)} size='sm'
              className={`btn-icon mb-1 ${className}`}>
        Add Note
      </Button>
      <ProjectModal showModal={showModal}
                    setShowModal={setShowModal}
                    modalId='project-note-modal'
                    modalTitle='Add Note'
                    render={() => <NoteForm projectId={projectId} keywordId={keywordId}
                                            closeModal={() => setShowModal(
                                              false)}/>}
      />
    </>
  )
}

export default AddProjectNoteButton