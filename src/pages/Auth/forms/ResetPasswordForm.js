import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik/dist/index'
import * as yup from 'yup'
import Logo from './../partials/Logo'
import * as API from './../../../utils/API'
import axios from 'axios'

function ResetPasswordForm ({ match }) {
  const [resetState, setResetState] = useState(false)

  useEffect(() => {
    document.getElementsByTagName('body')[0].className = 'authentication-bg'
  })

  const resetToken = match.params.token
  const schema = yup.object().shape({
    email: yup.string().required('Email Required'),
    password: yup.string().required('Password Required').min(8, 'Password need at least 8 characters'),
    password_confirm: yup.string().required('Password Confirm Required').oneOf([yup.ref('password'), null], 'Passwords must match'),
  })

  if (resetState === true) {
    return <Redirect to="/"/>
  }
  return (
    <Formik
      initialValues={{ email: '', password: '', password_confirm: '' }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        let postData = {
          token: resetToken,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirm,
        }
        axios.post(`${API.apiUrl}api/auth/reset/password`, postData).then(response => {
          console.log('response')
          alert(response.data.message)
          setSubmitting(false)
          setResetState(true)

        }).catch(error => {
          if (error.response) {
            alert(error.response.data.message)
          }
        })
      }}
    >
      {({ isSubmitting }) => (
        <div className="account-pages mt-5 mb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card">
                  <Logo/>
                  <div className="card-body p-4">
                    <Form>
                      <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <Field id="email" type="email" name="email"
                               className="form-control"
                               placeholder="Enter your email"/>
                        <ErrorMessage name="email" component="div"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Password</label>
                        <Field id="password" type="password" name="password"
                               className="form-control"
                               placeholder="Enter your password"/>
                        <ErrorMessage name="password" component="div"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Password Confirmation</label>
                        <Field id="password_confirm" type="password"
                               name="password_confirm"
                               className="form-control"
                               placeholder="Confirm your password"/>
                        <ErrorMessage name="password_confirm" component="div"/>
                      </div>
                      <div className="form-group mb-0 text-center">
                        <button className="btn btn-primary" type="submit">
                          Change
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default ResetPasswordForm
