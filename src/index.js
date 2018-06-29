import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import App from './app';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

ReactDOM.render(
  <Router>
    <div>
      <Route component={ScrollToTop}/>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </div>
  </Router>,
  document.getElementById('root'),
);