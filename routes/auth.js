const express = require('express');
const { body } = require('express-validator');

const authContoller = require('../controllers/auth');

const authValidation = require('../validation/authValidation');

const Router = express.Router();

Router.put('/signup', authValidation.validateSignUp, authContoller.signUp)

module.exports = Router;
