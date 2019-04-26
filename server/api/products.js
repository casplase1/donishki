import express from 'express';
import { Pool } from 'pg';

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
    console.log(id);
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

router.post('/products/', async (req, res, next) => {
  try {
    const {
      name,
      typeCode,
      groupName,
      icon,
      image,
      isCarved,
      size,
      material,
      price,
      order,
    } = req.body;

    console.log('=-=--==-=-=--=-=-=');
    console.log(isCarved);
    console.log('=-=--==-=-=--=-=-=');

    pool.query('INSERT INTO products (name, group_name, type_code, image, icon, is_carved, size, material, price, "order") '
      + 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
    [name, groupName, typeCode, image, icon, isCarved, size, material, price, order],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.json(results.rows[0]);
    });
  } catch (e) {
    next(e);
  }
});

router.put('/products/:productId?', async (req, res, next) => {
  try {
    const id = req.productId;
    const {
      name,
      typeCode,
      groupName,
      icon,
      image,
      isCarved,
      size,
      material,
      price,
      order,
    } = req.body;
    pool.query('UPDATE products SET name = $1, group_name = $2, type_code = $3, image = $4, icon = $5, is_carved = $6, size = $7, material = $8, price = $9, "order" = $10 '
      + 'WHERE id = $11',
    [name, groupName, typeCode, image, icon, isCarved, size, material, price, order, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      res.send();
    });
  } catch (e) {
    next(e);
  }
});

router.delete('/products/:productId?', async (req, res, next) => {
  try {
    const id = Number(req.params.productId);
    pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      res.send();
    });
  } catch (e) {
    next(e);
  }
});

export default router;
