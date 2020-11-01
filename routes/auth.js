const express = require('express');

const authContoller = require('../controllers/auth');

const authValidation = require('../validation/authValidation');

const isAuth = require('../middleware/is-auth');

const Router = express.Router();

Router.get('/user', isAuth, authContoller.getUser);

Router.put('/signup', authValidation.validateSignUp, authContoller.signUp);

Router.post('/signin', authContoller.signIn);

module.exports = Router;
