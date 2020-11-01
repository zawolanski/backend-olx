const express = require('express');

const announcementContoller = require('../controllers/announcement');

const announcementValidation = require('../validation/announcementValidation');

const isAuth = require('../middleware/is-auth');

const Router = express.Router();

Router.get('/getAnnoucements', announcementContoller.getAnnoucements);

Router.post('/getAnnoucement', announcementContoller.getAnnoucement);

Router.put(
  '/addAnnoucement',
  isAuth,
  announcementValidation.validateAddAnnouncement,
  announcementContoller.addAnnoucement,
);

Router.patch('/updateAnnoucement');

Router.delete('/removeAnnoucement/:annId', announcementContoller.removeAnnoucement);

Router.put('/addCategory', announcementContoller.addCategory);

Router.get('/getCategories', announcementContoller.getCategories);

module.exports = Router;
