import React from 'react'
import Helmet from 'react-helmet'
import Logo from './partials/Logo'
import LoginForm from './forms/LoginForm'
import HeaderText from './partials/HeaderText'
import axios from 'axios'

function Login(){
  React.useEffect(() => {
    axios.post('https://api.linktracker.pro/api/test')
  }, [])

  return (
    <div className="account-pages mt-5 mb-5">
      <Helmet>
        <title>{process.env.REACT_APP_NAME} - Login</title>
      </Helmet>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card">
              <Logo/>
              <div className="card-body p-4">
                <HeaderText title="Sign In" text="Enter your email address and password to access admin panel." />
                <LoginForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;