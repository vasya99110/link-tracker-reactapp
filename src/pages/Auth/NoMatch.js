import React from 'react';
import Helmet from 'react-helmet';
import Logo from './partials/Logo';
import {Link} from 'react-router-dom';

class NoMatch extends React.Component{
  componentDidMount() {
    document.getElementsByTagName('body')[0].className = 'authentication-bg';
  }
  
  render() {
    return (
        <div className="account-pages mt-5 mb-5">
          <Helmet>
            <title>Linktracker Login - Page not found</title>
          </Helmet>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card">
                  <Logo/>
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h1 className="text-error">4<i
                          className="mdi mdi-emoticon-sad"></i>4</h1>
                      <h4 className="text-uppercase text-danger mt-3">Page Not
                        Found</h4>
                      <p className="text-muted mt-3">It's looking like you may
                        have taken a wrong turn. Don't worry... it
                        happens to the best of us. Here's a
                        little tip that might help you get back on track.</p>

                      <Link to="/" className="btn btn-info mt-3"><i className="mdi mdi-reply"></i> Return Home</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default NoMatch;