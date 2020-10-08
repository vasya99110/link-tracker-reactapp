import React from 'react'
import { useProjectDetailValue } from '../../../context/project-detail-context'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { addNote, editNote, getNote } from '../../../../../utils/project-client'
import formStyles from '../Button/css/NoteForm.module.css'
import { Button, Col, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { FormTextInput } from '../../../../../components/Form/formhelper'
import ButtonSpinner from '../../../../../components/ButtonSpinner'

function NoteForm ({ projectId, noteId, keywordId, closeModal }) {
  const [{ noteFetchCount }, dispatch] = useProjectDetailValue()
  const [startDate, setStartDate] = React.useState('')
  const [formValues, setFormValues] = React.useState({
    noteDate: '',
    noteContent: '',
    projectId: projectId,
    keywordId: keywordId,
    noteId: noteId,
  })

  React.useEffect(() => {
    const updateEditValues = (noteId) => {
      getNote({noteId}).then(response => {
        const resFormData = response.data.data
        setStartDate(new Date(resFormData.note_date))
        setFormValues({
          ...formValues,
          noteDate: moment(resFormData.note_date).format('YYYY-MM-DD'),
          noteContent: resFormData.note_content,
        })

        console.log(resFormData)

        // setFormValues(response.data.data)
      }).catch(error => {
        console.log('form edit error', error)
      })
    }

    if(noteId !== undefined) {
      updateEditValues(noteId)
    }
  }, [noteId])

  return (
    <Formik
      enableReinitialize={true}
      initialValues={formValues}
      validationSchema={Yup.object({
        noteDate: Yup.date()
          // .min(moment.min(momentDates).format('YYYY-MM-DD'))
          .max(moment().format('YYYY-MM-DD'))
          .required('Note date required').typeError('Invalid Date'),
        noteContent: Yup.string().required('Note content required')
        .typeError('Invalid content'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        let submitFn = editNote
        if(noteId === undefined) {
          submitFn = addNote
        }
        await submitFn(values).then(resonse => {
          dispatch({ 'type': 'fetchNoteList',
            noteFetchCount: noteFetchCount + 1 })

          if(noteId === undefined) closeModal()
          setSubmitting(false)
        })
        /*await handleAction({
          actionFn: submitFn,
          successFn: () => {
            dispatch(
              { 'type': 'fetchNoteList', noteFetchCount: noteFetchCount + 1 })
            if(noteId === undefined) closeModal()
            setSubmitting(false)
          },
          data: values,
        })*/
      }}
    >
      {({ errors, handleBlur, handleChange, setFieldValue, isSubmitting }) => (
        <Form className={formStyles['note-form']}>
          <Row>
            <input type='hidden' name='projectId'/>
            <input type='hidden' name='keywordId'/>
            <input type='hidden' name='noteId'/>
            <Col>
              <div className={`form-group mb-3`}>
                <DatePicker
                  inline={false}
                  disabledKeyboardNavigation={true}
                  placeholderText='Date'
                  className='form-control'
                  selected={startDate}
                  dateFormat='yyyy-MM-dd'
                  onBlur={handleBlur}
                  name='noteDate'
                  id='noteDate'
                  onChange={(date, e) => {
                    handleChange(e)
                    setFieldValue('noteDate', moment(date).format('YYYY-MM-DD'))
                    setStartDate(date)
                  }}
                  maxDate={moment().toDate()}
                  // highlightDates={chartDates}
                  // includeDates={chartDates}
                />
                {errors.noteDate &&
                <div className='error text-warning'>{errors.noteDate}</div>}
              </div>
            </Col>
            <Col>
              <FormTextInput placeholder='Note' name='noteContent'/>
            </Col>
          </Row>

          <div className='button-list'>
            <Button variant='success' type='submit'>
              {isSubmitting && <ButtonSpinner/>} Save Note</Button>
            <Button variant='light' type='button'
                    onClick={closeModal}>Cancel</Button>
          </div>
        </Form>
      )
      }
    </Formik>
  )
}

export default NoteForm