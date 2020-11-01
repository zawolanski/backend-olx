const { body, validationResult } = require('express-validator');
const Announcement = require('../models/announcement');

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

exports.validateAddAnnouncement = [
  body('title', 'Tytuł jest niepoprawny.').isLength({
    min: 1,
    max: 40,
  }),
  body('price', 'Cena jest niepoprawna.').isInt({ gt: 0, lt: 1000000 }),
  body('description', 'Opis jest niepoprawny.').isLength({
    min: 1,
    max: 40,
  }),
  body('phone_number', 'Numer telefonu jest niepoprawny.').matches(phoneRegExp),
  body('localization', 'Lokalizacja jest niepoprawna.').isLength({
    min: 1,
    max: 40,
  }),
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
