import React from 'react'
import ProjectModal from '../../../component/ProjectModal'
import { Button } from 'react-bootstrap'
import { useProjectDetailValue } from '../../../context/project-detail-context'
import { handleAction } from '../../../../../utils/api-client'
import { deleteKeyword } from '../../../../../utils/keyword-client'

function ModalContent({closeModal, keywordId}){
  const [{keywordFetchCount}, dispatch] = useProjectDetailValue()
  const updateFetchCount = count => dispatch({type:'fetchKeywordList', keywordFetchCount: count})

  function doDeleteKeyword(keywordId) {
    handleAction({
      actionFn: deleteKeyword,
      successFn: () => {
        updateFetchCount(keywordFetchCount + 1)
        closeModal()
      },
      data: keywordId
    })

  }

  return (
    <div className='button-list'>
      <Button variant='danger' onClick={() => doDeleteKeyword(keywordId)}>Delete</Button>
      <Button variant='light' onClick={closeModal}>Cancel</Button>
    </div>
  )
}

function DeleteKeywordButton ({keywordId}) {
  const [showModal, setShowModal] = React.useState(false)
  const openModal = (setShowModal) => setShowModal(true)

  return(
    <>
      <span className='span-button text-danger' onClick={() => openModal(setShowModal)}><i className="mdi mdi-trash-can"></i></span>
      <ProjectModal showModal={showModal}
                    setShowModal={setShowModal}
                    modalId='keyword-delete-modal'
                    modalTitle='Do you want to delete this keyword?'
                    render={() => <ModalContent keywordId={keywordId}
                                                closeModal={() => setShowModal(false)}/>}
      />
  </>
)
}

export default DeleteKeywordButton