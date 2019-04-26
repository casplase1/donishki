import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  database: 'donishki',
  user: 'root',
  password: 'root',
  port: 5432,
});

/**
 *  The Auth Checker middleware function.
 */
export default (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;


    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }

      console.log(results.rows);
    });

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
};
