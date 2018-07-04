import express from 'express';
import mailer from '../services/mailer';
import formatter from '../services/itemsFormatter';
// import { config } from '../config';

const router = express.Router();

router.post('/order', async (req, res, next) => {
  try {
    const items = req.body.items ? formatter(req.body.items) : null;
    mailer('Donishki.ru', { phone: req.body.phone, name: req.body.name, items});
    res.json({
      status: 'success',
    });
  } catch (e) {
    next(e);
  }
});

export default router;
