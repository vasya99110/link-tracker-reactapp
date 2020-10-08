import React from 'react'
import ProjectModal from '../../../component/ProjectModal'
import NoteForm from '../Form/NoteForm'

function EditNoteButton ({ projectId, noteId }) {
  const [showEditModal, setShowEditModal] = React.useState(false)
  const openModal = (setShowModal) => setShowModal(true)

  return (
    <>
      <span className='span-button text-info' onClick={() => openModal(setShowEditModal)}><i className="mdi mdi-pencil"></i></span>
      <ProjectModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        modalId='note-edit-modal'
        modalTitle='Note Edit'
        render={() => <NoteForm projectId={projectId} noteId={noteId}
                              closeModal={() => setShowEditModal(false)}/>}
      />
    </>
  )
}

export default EditNoteButton