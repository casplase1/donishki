import express from 'express';
import products from './productList';

const router = express.Router();

router.get('/products/', async (req, res, next) => {
  try {
    res.json(products);
  } catch (e) {
    next(e);
  }
});

export default router;
