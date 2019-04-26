const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const PassportLocalStrategy = require('passport-local').Strategy;
// const config = require('../../config');
// import User from '../models/user';

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  };

  const dbPassword = '$2a$10$LBR7pnrJ2Vxs727h9I8kyuRrJYp7RwskJKBXJSg4/dXm.cNwELAuu';
  const dbEmail = 'cradmin@bk.ru';
  const dbid = 1;

  return bcrypt.compare(userData.password, dbPassword, (passwordErr, isMatch) => {
    if (passwordErr) {
      return done(passwordErr);
    }

    if (!isMatch) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    const payload = {
      sub: dbid,
    };

    const token = jwt.sign(payload, 'doowesac');
    const data = {
      email: dbEmail,
    };

    return done(null, token, data);
  });

  // return User.findOne({ email: userData.email }, (err, user) => {
  //   // if (err) { return done(err); }
  //
  //   // if (!user) {
  //   //   const error = new Error('Incorrect email or password');
  //   //   error.name = 'IncorrectCredentialsError';
  //   //
  //   //   return done(error);
  //   // }
  //
  //
  // });
});
