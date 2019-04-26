import express from 'express';
import { Pool } from 'pg';
// import products from './productList';

const pool = new Pool({
  host: 'localhost',
  database: 'donishki',
  user: 'root',
  password: 'root',
  port: 5432,
});

const router = express.Router();

router.param('productId', (req, res, next, id) => {
  req.productId = id;
  return next();
});

router.get('/products/', async (req, res, next) => {
  try {
    pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }

      res.json(results.rows);
    });
  } catch (e) {
    next(e);
  }
});

router.get('/products/:productId', async (req, res, next) => {
  try {
    const id = req.productId;
    pool.query('SELECT * FROM products WHERE id = $1 ORDER BY id ASC', [id], (error, results) => {
      if (error) {
        throw error;
      }

      res.json(results.rows);
    });
  } catch (e) {
    next(e);
  }
});

export default router;
