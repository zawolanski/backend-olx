const { body, validationResult } = require('express-validator');
const Announcement = require('../models/announcement');

exports.validateAddAnnouncement = [
  body('user_id', 'Wystąpił błąd podczas dodawania ogłoszenia.').custom((value) => {
    if (value.length === 12 || value.length === 24) {
      return true;
    }
    return Promise.reject('Wystąpił błąd podczas dodawania ogłoszenia.');
  }),
  body('category_id', 'Wystąpił błąd podczas dodawania ogłoszenia.').custom((value) => {
    if (value.length === 12 || value.length === 24) {
      return true;
    }
    return Promise.reject('Wystąpił błąd podczas dodawania ogłoszenia.');
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(422)
        .json({ message: 'Validation failed!', errors: errors.array(), success: false });
    next();
  },
];
