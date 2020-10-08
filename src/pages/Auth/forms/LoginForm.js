import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik/dist/index'
import { Link } from 'react-router-dom'
import { object as yupObject, string as yupString } from 'yup'
import { useAuth } from '../../../context/auth-context'
import { Button } from 'reactstrap'
import ButtonSpinner from '../../../components/ButtonSpinner'

function LoginForm () {
  const loginRules = {
    email: yupString().required('Email Required').email('Email not valid'),
    password: yupString().required('Password Required').min(6, 'Password need at least 6 characters'),
  }

  const loginSchema = yupObject().shape(loginRules)
  const { login } = useAuth()

  return (
    <Formik
      initialValues={{ email: '', password: '', rememberMe: false }}
      validationSchema={loginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const email = values.email
        const password = values.password
        await login(email, password).then(setSubmitting(false))
      }}
    >
      {({ isSubmitting }) =>
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <Field id="email" type="email" name="email"
                   className="form-control"
                   placeholder="Enter your email"/>
            <ErrorMessage name="email" component="div" className='text-danger'/>
          </div>
          <div className="form-group">
            <Link to="/recoverpw"
                  className="text-muted float-right"><small>Forgot your
              password</small></Link>
            <label htmlFor="password">Password</label>
            <Field className="form-control" type="password" id="password"
                   placeholder="Enter your password"
                   name="password"/>
            <ErrorMessage name="password" component="div" className='text-danger'/>
          </div>
          <div className="form-group mb-3">
            <div className="custom-control custom-checkbox">
              <Field component="input" type="checkbox"
                     className="custom-control-input"
                     name="rememberMe"
                     id="checkbox-signin"/>
              <label className="custom-control-label"
                     htmlFor="checkbox-signin">Remember me</label>
            </div>
          </div>
          <div className="form-group mb-0 text-center">
            <Button color="primary" type="submit">
              {isSubmitting && <ButtonSpinner/>} Login
            </Button>
          </div>
        </Form>
      }
    </Formik>
  )
}

export default LoginForm