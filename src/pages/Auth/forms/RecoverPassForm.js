import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik/dist/index'
import * as yup from 'yup'
import * as API from '../../../utils/API'

class RecoverPassForm extends React.Component {
  render() {
    const schema = yup.object().shape({
      emailaddress: yup.string().required('Email Required'),
    })

    return (
      <Formik
        initialValues={{ emailaddress: '' }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          const email = values.emailaddress

          API.post('api/auth/reset-password', { email: email }).then(response => {
              const result = response.data
              alert(result.message)
              setSubmitting(false)
              console.dir(response)
            }).catch(error => {
              alert('Some error existed. Please contact administrator')
              console.dir(error)
            })
          /*setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);*/
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group mb-3">
              <label htmlFor="emailaddress">Email address</label>
              <Field type="email" name="emailaddress" className="form-control"
                id="emailaddress" placeholder="Enter your email" />
              <ErrorMessage name="emailaddress" component="div" />
            </div>

            <div className="form-group mb-0 text-center">
              <button className="btn btn-primary" type="submit"
                disabled={isSubmitting}>
                Reset Password
              </button>
            </div>
          </Form>
        )}
      </Formik>
    )
  }
}

export default RecoverPassForm