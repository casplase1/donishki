import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, BrowserRouter as Router, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './App';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

ReactDOM.render(
  <Router history={browserHistory}>
    <CookiesProvider>
      <Route component={ScrollToTop} />
      <App />
    </CookiesProvider>
  </Router>,
  document.getElementById('root'),
);
