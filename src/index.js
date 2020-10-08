import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AppProviders from './context'
// import { render } from 'react-snapshot';
//import * as serviceWorker from './serviceWorker';

window.Chargebee.init({
  site: 'linktrackerpro-test',
  publishableKey: 'test_STuiGc9qwTOPcjuFrwhcYvpd3JJalgQE'
})

ReactDOM.render(
  <AppProviders>
    <App/>
  </AppProviders>,
  document.getElementById('root')
);
// render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
