import React from 'react'
import ProjectModal from '../../component/ProjectModal'
import { Form, Formik } from 'formik'
import { FormTextArea } from '../../../../components/Form/formhelper'
import * as Yup from 'yup'
import ButtonSpinner from '../../../../components/ButtonSpinner'
import { addKeywords } from '../../../../utils/keyword-client'
import { handleAction } from '../../../../utils/api-client'
import { useProjectDetailValue } from '../../context/project-detail-context'

function ProjectKeywordForm ({ projectId, closeModal }) {
  const [{ keywordFetchCount }, dispatch] = useProjectDetailValue()
  return <Formik
    initialValues={{ 'keywords': '', 'projectId': projectId }}
    validationSchema={Yup.object({
      keywords: Yup.string().required('Keywords required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      handleAction({
        actionFn: addKeywords,
        data: values,
        successFn: () => {
          closeModal()
          dispatch({
            type: 'fetchKeywordList',
            keywordFetchCount: keywordFetchCount + 1,
          })
        },
      })
    }}
  >
    {({ isSubmitting }) => <Form>
      <input type='hidden' name='projectId'/>
      <FormTextArea label='Keywords' name='keywords' rows='5'/>
      <small>Enter one keyword or multiple keywords separate by line</small>
      <div className='form-group'>
        <div className='button-list'>
          <button className='btn btn-success' type="submit">
            {isSubmitting && <ButtonSpinner/>} Save
          </button>
          <button className='btn btn-info'
                  onClick={(e) => closeModal()}>Cancel
          </button>
        </div>
      </div>
    </Form>
    }
  </Formik>
}

function AddKeywordButton ({ projectId }) {
  const [showModal, setShowModal] = React.useState(false)
  const openModal = (setShowModal) => setShowModal(true)

  return (
    <>
      <span className='span-button text-danger'
            onClick={() => openModal(setShowModal)}><i
        className="mdi mdi-plus"></i></span>
      <ProjectModal showModal={showModal} setShowModal={setShowModal}
                    modalId='project-keyword-modal'
                    modalTitle='Add Keyword'
                    render={() => <ProjectKeywordForm projectId={projectId}
                                                      closeModal={() => setShowModal(
                                                        false)}/>}
      />
    </>
  )
}

export default AddKeywordButton