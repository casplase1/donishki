import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import PassportLocalStrategy from 'passport-local';
import { Pool } from 'pg';
import config from '../config';

const pool = new Pool({
  host: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  port: config.db.port,
});
/**
 * Return the Passport Local Strategy object.
 */
export default new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  };

  const dbRequest = new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users where email = $1', [userData.email], (error, results) => {
      if (error) {
        throw error;
      }

      if (results.rows[0]) {
        return resolve(results.rows[0]);
      }

      return reject();
    });
  });

  dbRequest.then(dbData => (
    bcrypt.compare(userData.password, dbData.password, (passwordErr, isMatch) => {
      if (passwordErr) {
        return done(passwordErr);
      }

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: dbData.id,
      };

      const token = jwt.sign(payload, config.jwtSecret);

      return done(null, token);
    })
  )).catch(e => (done(e)));
});
