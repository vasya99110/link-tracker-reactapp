import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Auth from './pages/Auth'
import Preloader from './components/Preloader'
import ResetPasswordForm from './pages/Auth/forms/ResetPasswordForm'

function UnauthenticatedApp() {
  useEffect(() => {
    setTimeout(function() {
      document.body.classList.remove('loading');
    }, 400);
  });

  return (
      <BrowserRouter>
        <Suspense fallback={<Preloader/>}>
          <Switch>
            <Route path="/login" exact
                   render={props => <Auth {...props} type="Login"/>}/>
            <Route path="/recoverpw" exact
                   render={props => <Auth {...props}
                                          type="RecoverPassword"/>}/>
            <Route path="/reset-password/:token" exact component={ResetPasswordForm} />
            <Route render={() => <Redirect to="/login"/>}/>
          </Switch>
        </Suspense>
      </BrowserRouter>
  );
}

export default UnauthenticatedApp;
