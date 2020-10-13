const express = require('express');

const authContoller = require('../controllers/auth');

const authValidation = require('../validation/authValidation');

const Router = express.Router();

Router.put('/signup', authValidation.validateSignUp, authContoller.signUp);

Router.post('/signin', authContoller.signIn);

module.exports = Router;
