import bodyParser from 'body-parser';
import React from 'react';
import express from 'express';
import passport from 'passport';
import compression from 'compression';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { CookiesProvider } from 'react-cookie';
import fs from 'fs';
import path from 'path';
import './ignore-styles';
import 'isomorphic-fetch';
import App from '../src/App';

const cookiesMiddleware = require('universal-cookie-express');
const localLoginStrategy = require('./passport/local-login');

passport.use('local-login', localLoginStrategy);

const app = express();

app.use(cookiesMiddleware());
app.use(compression());

app.use(express.static(path.join(__dirname, '..', 'static')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', require('./api/order').default);
app.use('/api', require('./api/image').default);
app.use('/api', require('./api/products').default);
app.use('/auth', require('./routes/auth').default);

app.get('/*', (req, res) => {
  const filePath = path.resolve(__dirname, '..', 'public', 'main.html');
  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      // logger.error('read err', err);
      return res.status(404).end();
    }

    const { url } = req;

    const sheet = new ServerStyleSheet();
    const context = {};
    const markup = renderToString(
      <StyleSheetManager sheet={sheet.instance}>
        <StaticRouter location={url} context={context}>
          <CookiesProvider cookies={req.universalCookies}>
            <App />
          </CookiesProvider>
        </StaticRouter>
      </StyleSheetManager>,
    );

    const styleTags = sheet.getStyleTags();

    const RenderedApp = process.env.NODE_ENV === 'development' ? htmlData : htmlData
      .replace('<style id="serverStyleTags"></style>', styleTags)
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

    return res.send(RenderedApp);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

app.on('error', (error) => {
  throw error;
});
