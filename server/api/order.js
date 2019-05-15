/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import pdf from 'html-pdf';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import express from 'express';
import mailer from '../services/mailer';
import formatter from '../services/itemsFormatter';
import wholesaleFormatter from '../services/wholesaleItemsFormatter';
import PriceToClient from '../templates/PriceClient';
import PriceToManufacture from '../templates/PriceManufacture';
import Footer from '../templates/Footer';
import config from '../config';

const router = express.Router();

const getFooter = () => {
  const sheet1 = new ServerStyleSheet();
  const toClient = renderToString(
    <StyleSheetManager sheet={sheet1.instance}>
      <Footer />
    </StyleSheetManager>,
  );

  return `${toClient}${sheet1.getStyleTags()}`;
};

const getFileBuffer = async markup => new Promise(
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
      footer: {
        height: '28mm',
        contents: {
          default: getFooter(),
        },
      },
    }).toBuffer((err, buffer) => {
      if (err) {
        console.log(err);
      }
      return resolve(buffer);
    })
  ),
);

const getSummary = (items, isWholesale) => (
  items.reduce(
    (accumulator, currentItem) => accumulator + currentItem.count
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

    const { headers: { host } } = req;

    const mailBody = getMailBody({
      items,
      phone,
      name,
    });

    res.json({
      status: 'success',
    });

    const sheet1 = new ServerStyleSheet();
    const toClient = renderToString(
      <StyleSheetManager sheet={sheet1.instance}>
        <PriceToClient items={items} host={host} isWholesale={false} />
      </StyleSheetManager>,
    );
    const styleTags1 = sheet1.getStyleTags();
    const PDFtoClient = await getFileBuffer(`${styleTags1}${toClient}`);


    const sheet2 = new ServerStyleSheet();
    const toProd = renderToString(
      <StyleSheetManager sheet={sheet2.instance}>
        <PriceToManufacture items={items} host={host} />
      </StyleSheetManager>,
    );
    const styleTags2 = sheet2.getStyleTags();
    const PDFtoProduction = await getFileBuffer(`${styleTags2}${toProd}`);

    mailer(
      'Розничный заказ | Donishki.ru',
      mailBody,
      [
        {
          filename: 'price_to_client.pdf',
          content: PDFtoClient,
        },
        {
          filename: 'price_to_production.pdf',
          content: PDFtoProduction,
        },
      ],
      config.notificationRecipient,
    );
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

    res.json({
      status: 'success',
    });

    // const PDFtoClient = Buffer;
    const sheet1 = new ServerStyleSheet();
    const toClient = renderToString(
      <StyleSheetManager sheet={sheet1.instance}>
        <PriceToClient isWholesale items={items} host={host} />
      </StyleSheetManager>,
    );
    const styleTags1 = sheet1.getStyleTags();
    const PDFtoClient = await getFileBuffer(`${styleTags1}${toClient}`);

    // const PDFtoProduction = Buffer;
    const sheet2 = new ServerStyleSheet();
    const toProduction = renderToString(
      <StyleSheetManager sheet={sheet2.instance}>
        <PriceToManufacture items={items} host={host} />
      </StyleSheetManager>,
    );
    const styleTags2 = sheet2.getStyleTags();
    const PDFtoProduction = await getFileBuffer(`${styleTags2}${toProduction}`);

    if (email) {
      mailer(
        'Заказ на сайте Donishki.ru',
        'Выбранные вами позиции в прикрепленном файле price.pdf',
        [
          {
            filename: 'price.pdf',
            content: PDFtoClient,
          },
        ],
        email,
      );
    }

    const htmlToManufacture = getMailBody({
      items,
      phone,
      name,
      email,
    }, true);

    mailer(
      'Оптовый заказ | Donishki.ru',
      htmlToManufacture,
      [
        {
          filename: 'price_to_client.pdf',
          content: PDFtoClient,
        },
        {
          filename: 'price_to_production.pdf',
          content: PDFtoProduction,
        },
      ],
      config.notificationRecipient,
    );
  } catch (e) {
    next(e);
  }
});

export default router;
