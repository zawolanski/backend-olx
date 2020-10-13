const {body, validationResult} = require('express-validator');
const User = require('../models/user');

exports.validateSignUp = [
    body('email', 'E-mail jest niepoprawny.')
      .isEmail()
      .normalizeEmail()
      .custom((value) => {
          return User.findOne({email: value}).then(doc => {
            if (doc) return Promise.reject('E-mail już istnieje.');
          })
      }),
    body('password', 'Tylko liczby i litery. Długość od 5 do 25 znaków.')
      .trim()
      .matches(/^[A-Z0-9]+$/i)
      .isLength({
        min: 5,
        max: 25,
      }),
    body('repeatedPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          return Promise.reject('Hasła nie są takie same.');
        }
        return true;
      }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ message: 'Validation failed!', errors: errors.array(), success: false });
        next();
    },
]
