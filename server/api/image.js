import express from 'express';
import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  database: 'donishki',
  user: 'root',
  password: 'root',
  port: 5432,
});


const router = express.Router();


const processImage = async (src, dst, width) => {
  return new Promise(function (resolve, reject) {
    im.resize({
      srcPath: src,
      dstPath: dst,
      width: width
    }, function (err, stdout, stderr) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

const getFormData = req =>
  new Promise((resolve, reject) => {
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
      return resolve({fields: data, files});
    });
  });

// router.param('imageId', (req, res, next, id) => {
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return next(new Error('NotFoundException'));
//   }
//   req.imageId = id;
//   return next();
// });
//
// router.param('productId', (req, res, next, id) => {
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return next(new Error('NotFoundException'));
//   }
//   req.productId = id;
//   return next();
// });

// router.get('/image/:productId', async (req, res, next) => {
//   try {
//     const photos = await Photo.find({product: ObjectId(req.productId)}).sort([['order', 1]]);
//     console.log(photos);
//     res.json({
//       status: 'success',
//       photos
//     });
//   } catch (e) {
//     next(e);
//   }
// });

// router.put('/image/', async (req, res, next) => {
//   try {
//     const data = await getFormData(req);
//     const productId = data.fields.productId;
//     const productUrl = data.fields.productUrl;
//     const file = data.files.file[0];
//     const originalFileName = file.originalFilename.split(' ').join('-');
//     const fileName = `${productUrl}-${originalFileName}`;
//     const imagePath = path.join(IMAGE_PATH, fileName);
//
//     await processImage(file.path, imagePath, 1024);
//     await processImage(file.path, path.join(IMAGE_PATH, 'thumbnail', fileName), 200);
//
//     await Photo.create({
//       name: fileName,
//       path: imagePath,
//       product: ObjectId(productId),
//       order: 0,
//       create_date: new Date(),
//     });
//
//     res.json({
//       status: 'success',
//     });
//   } catch (e) {
//     next(e);
//   }
// });

// router.delete('/image/:imageId', async (req, res, next) => {
//   try {
//
//     const photo = await Photo.findOne({_id: ObjectId(req.imageId)});
//
//     const imgPath = path.join(IMAGE_PATH, photo.name);
//     fs.stat(imgPath, function (err, stats) {
//       if (err) {
//         return console.error(err);
//       }
//
//       fs.unlink(imgPath, function (err) {
//         if (err) return console.log(err);
//         console.log('file deleted successfully');
//       });
//     });
//
//     const thmbPath = path.join(IMAGE_PATH, 'thumbnail', photo.name);
//     fs.stat(thmbPath, function (err, stats) {
//       if (err) {
//         return console.error(err);
//       }
//
//       fs.unlink(thmbPath, function (err) {
//         if (err) return console.log(err);
//         console.log('file deleted successfully');
//       });
//     });
//
//     await photo.remove();
//
//     res.json({
//       status: 'success',
//     });
//   } catch (e) {
//     next(e);
//   }
// });

router.post('/image', async (req, res, next) => {
  try {
    const data = await getFormData(req);
    const { productId } = data.fields;
    const file = data.files.file[0];

    const ext = file.originalFilename.split('.').pop();
    const fileName = `${productId}.${ext}`;

    let imgType = '';
    let query = '';
    if (ext === 'jpg' || ext === 'jpeg') {
      query = 'UPDATE products SET image = $1 WHERE id = $2';
      imgType = 'images';
    } else {
      query = 'UPDATE products SET icon = $1 WHERE id = $2';
      imgType = 'icons';
    }

    const fileUrl = `/product/${imgType}/${fileName}`;
    const filePath = path.join(__dirname, '../../public/product/', imgType, fileName);

    fs.copyFile(file.path, filePath, (err) => {
      if (err) {
        return console.log(err);
      }

      return true;
    });

    pool.query(query, [fileUrl, productId],
      (error, results) => {
        if (error) {
          throw error;
        }

        res.send();
      });

    res.json({
      status: 'success',
    });
  } catch (e) {
    next(e);
  }
});

export default router;
