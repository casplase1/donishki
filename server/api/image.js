import express from 'express';
import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import config from '../config';

const pool = new Pool({
  host: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  port: config.db.port,
});

const router = express.Router();

const getFormData = req => new Promise((resolve, reject) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return reject(err);
    }
    const data = [];
    Object.keys(fields).map((key) => {
      data[key] = fields[key].pop();
      return null;
    });
    return resolve({ fields: data, files });
  });
});

router.post('/image', async (req, res, next) => {
  try {
    const data = await getFormData(req);
    const { productId, type } = data.fields;
    const file = data.files.file[0];

    let ext = file.originalFilename.split('.').pop();
    let imgType = '';
    let query = '';

    if (ext === 'jpeg') {
      ext = 'jpg';
    }

    if (type === 'image') {
      query = 'UPDATE products SET image = $1 WHERE id = $2';
      imgType = 'images';
    } else {
      query = 'UPDATE products SET icon = $1 WHERE id = $2';
      imgType = 'icons';
    }

    const fileName = `${productId}.${ext}`;
    const fileUrl = `/product/${imgType}/${fileName}`;
    const filePath = path.join(__dirname, '../../public/product/', imgType, fileName);

    fs.copyFile(file.path, filePath, (err) => {
      if (err) {
        return console.log(err);
      }

      return true;
    });

    pool.query(query, [fileUrl, productId],
      (error) => {
        if (error) {
          throw error;
        }

        res.json({
          status: 'success',
        });
      });
  } catch (e) {
    next(e);
  }
});

export default router;
