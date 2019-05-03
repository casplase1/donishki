import express from 'express';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import config from '../config';

const pool = new Pool({
  host: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  port: config.db.port,
});

const router = express.Router();

const formatter = rows => (
  rows.map(row => ({
    ...row,
    groupName: row.group_name,
    isCarved: row.is_carved,
    typeCode: row.type_code,
    wholesalePrice: row.wholesale_price,
  }))
);

router.param('productId', (req, res, next, id) => {
  req.productId = id;
  return next();
});

router.get('/products/', async (req, res, next) => {
  try {
    pool.query('SELECT * FROM products ORDER BY group_name=$5, group_name=$4, group_name=$3, group_name=$2, group_name=$1, material ASC, "order" ASC ', ['circle', 'square', 'rectangle', 'oval', 'form'], (error, results) => {
      if (error) {
        throw error;
      }

      res.json(formatter(results.rows));
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

      res.json(formatter(results.rows));
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
      wholesalePrice,
      order,
    } = req.body;

    pool.query('INSERT INTO products (name, group_name, type_code, image, icon, is_carved, size, material, price, wholesale_price, "order") '
      + 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
    [
      name,
      groupName,
      typeCode,
      image,
      icon,
      isCarved,
      size,
      material,
      price,
      wholesalePrice,
      order,
    ],
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
      isCarved,
      size,
      material,
      price,
      wholesalePrice,
      order,
    } = req.body;
    pool.query('UPDATE products SET name = $1, group_name = $2, type_code = $3, is_carved = $4, size = $5, material = $6, price = $7, wholesale_price = $8, "order" = $9 '
      + 'WHERE id = $10',
    [name, groupName, typeCode, isCarved, size, material, price, wholesalePrice, order, id],
    (error) => {
      if (error) {
        throw error;
      }

      res.send({ id });
    });
  } catch (e) {
    next(e);
  }
});

router.delete('/products/:productId?', async (req, res, next) => {
  try {
    const id = Number(req.params.productId);
    const mainPath = path.join(__dirname, '../../public/product/');
    const svgPath1 = `${mainPath}/images/${id}.svg`;
    const svgPath2 = `${mainPath}/icons/${id}.svg`;
    const jpgPath1 = `${mainPath}/images/${id}.jpg`;
    const jpgPath2 = `${mainPath}/icons/${id}.jpg`;

    [svgPath1, svgPath2, jpgPath1, jpgPath2].map((filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    });

    pool.query('DELETE FROM products WHERE id = $1', [id], (error) => {
      if (error) {
        throw error;
      }

      res.send();
    });
  } catch (e) {
    next(e);
  }
});

export default router;
