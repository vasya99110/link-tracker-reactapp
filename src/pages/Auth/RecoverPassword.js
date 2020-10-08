import React from 'react';
import Helmet from 'react-helmet';
import RecoverForm from './forms/RecoverPassForm';
import {Link} from 'react-router-dom';
import Logo from './partials/Logo';
import HeaderText from './partials/HeaderText';

function UnderText() {
  return (
      <div className="row mt-3">
        <div className="col-12 text-center">
          <p className="text-muted">Back to
            <Link to="/" className="text-muted ml-1"><b>LogIn</b></Link>
          </p>
        </div>
      </div>
  );
}

class RecoverPassword extends React.Component {
  componentDidMount() {
    document.getElementsByTagName('body')[0].className = 'authentication-bg';
  }

  render() {
    return (
        <div className="account-pages mt-5 mb-5">
          <Helmet>
            <title>Linktracker Pro - Recover Password</title>
          </Helmet>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card">
                  <Logo/>
                  <div className="card-body p-4">
                    <HeaderText title="Reset Password"
                        text="Enter your email address and we'll send you an email with instructions to reset your password."/>
                    <RecoverForm/>
                  </div>
                </div>
                <UnderText/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default RecoverPassword;