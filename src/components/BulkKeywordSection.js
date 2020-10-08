import React from 'react'
import { FormTextArea } from './Form/formhelper'
import { Field, FieldArray, getIn } from 'formik'
import { Button } from 'react-bootstrap'
import { isEmpty, isObject } from 'lodash'

const KeywordArrayErrors = errors => (isObject(errors) && !isEmpty(errors) &&
  typeof errors.errors.keywords === 'string')
  ? <span className='text-warning'>{errors.errors.keywords}</span>
  : null

const FieldArrayErrorMessage = ({ name }) => (
  <Field name={name}>
    {({ form }) => {
      const error = getIn(form.errors, name)
      const touch = getIn(form.touched, name)

      /*const errorTxt = touch || error ? error : null
      return <span className='text-warning'>{errorTxt}</span>*/
      return touch || error ? <span className='text-warning'>{error}</span> : null;
    }}
  </Field>
)

export default function BulkKeywordSection({ bulkImport, values, errors, touched }){
  if (bulkImport) {
    return (
      <div>
        <small>Please enter one keyword per line</small>
        <FormTextArea label='Bulk Import' name='bulkKeywords'/>
      </div>)
  } else {
    return <>
      <FieldArray
        name="keywords"
        render={arrayHelpers => (
          <div className='form-group mb-3'>
            <label htmlFor='keywordList'>Keywords</label>&nbsp;
            {values.keywords && values.keywords.length > 0 ? (
              values.keywords.map((keyword, index) => (
                <div key={index}>
                  <div className='input-group mb-1'>
                    <Field className='form-control'
                           name={`keywords[${index}].content`}/>

                    <div className="input-group-append">
                      <Button
                        variant="danger"
                        onClick={() => arrayHelpers.remove(
                          index)} // remove a keyword from the list
                      >
                        -
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => arrayHelpers.insert(index,
                          '')} // insert an empty string at a position
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <FieldArrayErrorMessage
                    name={`keywords[${index}].content`}/>
                </div>
              ))
            ) : (
              <Button variant="info" onClick={() => arrayHelpers.push('')}>
                {/* show this when user has removed all keywords from the list */}
                Add a keyword
              </Button>
            )}
            <KeywordArrayErrors errors={errors} touched={touched}/>
          </div>
        )}
      />

    </>
  }
}