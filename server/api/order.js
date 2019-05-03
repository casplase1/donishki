/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import stream from 'stream';
import pdf from 'html-pdf';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import express from 'express';
import mailer from '../services/mailer';
import formatter from '../services/itemsFormatter';
import wholesaleFormatter from '../services/wholesaleItemsFormatter';
import PriceToClient from '../templates/PriceClient';
import PriceToManufacture from '../templates/PriceManufacture';
import config from '../config';

const router = express.Router();

const getFileStream = async (markup, fileStream) => new Promise(
  resolve => (
    pdf.create(markup, {
      width: '420mm',
      height: '596mm',
      border: {
        top: '3cm',
        right: '3cm',
        bottom: '3cm',
        left: '3cm',
      },
    }).toStream((err, toStream) => {
      if (err) {
        console.log(err);
      }
      toStream.pipe(fileStream);
      return resolve();
    })
  ),
);

const getSummary = (items, isWholesale) => (
  items.reduce(
    (accumulator, currentItem) => accumulator
    + (currentItem.count || currentItem.quantity)
    * (isWholesale ? currentItem.wholesalePrice : currentItem.price), 0,
  )
);

const getMailBody = (data, isWholesale) => {
  let output = '';
  output += data.name ? `Имя: ${data.name} <br />` : '';
  output += data.phone ? `Телефон: ${data.phone} <br />` : '';
  output += data.email ? `Почта: ${data.email} <br />` : '';
  output += data.items ? `Позиции: <br /> ${isWholesale
    ? wholesaleFormatter(data.items)
    : formatter(data.items)}` : '';
  output += '<br /><br />';
  output += data.items ? `Итоговая сумма: ${getSummary(data.items, isWholesale)}` : '';
  output += '<br />';
  return output;
};

router.post('/order', async (req, res, next) => {
  try {
    const {
      items,
      phone,
      name,
    } = req.body;

    const htmlToManufacture = getMailBody({
      items,
      phone,
      name,
    });

    mailer(
      'Розничный заказ | Donishki.ru',
      htmlToManufacture,
      null,
      config.notificationRecipient,
    );

    res.json({
      status: 'success',
    });
  } catch (e) {
    next(e);
  }
});

router.post('/wholesale-order', async (req, res, next) => {
  try {
    const {
      items,
      phone,
      name,
      email,
    } = req.body;

    const { headers: { host } } = req;

    const PdfToClient = new stream.PassThrough();
    const sheet1 = new ServerStyleSheet();
    const toClient = renderToString(
      <StyleSheetManager sheet={sheet1.instance}>
        <PriceToClient items={items} host={host} />
      </StyleSheetManager>,
    );

    const styleTags1 = sheet1.getStyleTags();
    await getFileStream(`${styleTags1}${toClient}`, PdfToClient);
    if (email) {
      mailer(
        'Заказ на сайте Donishki.ru',
        '',
        PdfToClient,
        email,
      );
    }

    const PdfToManufacture = new stream.PassThrough();
    const sheet2 = new ServerStyleSheet();
    const toManufacture = renderToString(
      <StyleSheetManager sheet={sheet2.instance}>
        <PriceToManufacture items={items} host={host} />
      </StyleSheetManager>,
    );

    const styleTags2 = sheet2.getStyleTags();

    await getFileStream(`${styleTags2}${toManufacture}`, PdfToManufacture);

    const htmlToManufacture = getMailBody({
      items,
      phone,
      name,
      email,
    }, true);

    mailer(
      'Оптовый заказ | Donishki.ru',
      htmlToManufacture,
      PdfToManufacture,
      config.notificationRecipient,
    );

    res.json({
      status: 'success',
    });
  } catch (e) {
    next(e);
  }
});

export default router;
