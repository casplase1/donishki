import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
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

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }

  return passport.authenticate('local-login', (err, token) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
    });
  })(req, res, next);
});

router.get('/check-auth', (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).end();
    }
    const userId = decoded.sub;

    const dbRequest = new Promise((resolve, reject) => {
      pool.query('SELECT * FROM users where id = $1', [userId], (error, results) => {
        if (error) {
          throw error;
        }

        if (results.rows[0]) {
          return resolve(results.rows[0]);
        }

        return reject();
      });
    });

    return dbRequest
      .then(() => res.json({
        status: 'success',
      }))
      .catch(e => next(e));
  });
});

// bcrypt.genSalt((saltError, salt) => {
//   if (saltError) { return next(saltError); }
//
//   return bcrypt.hash('password', salt, (hashError, hash) => {
//     if (hashError) { return next(hashError); }
//
//     // replace a password string with hash value
//     console.log('hash');
//     console.log(hash);
//
//   });
// });

export default router;
