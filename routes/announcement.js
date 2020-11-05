const express = require('express');

const announcementContoller = require('../controllers/announcement');

const announcementValidation = require('../validation/announcementValidation');

const isAuth = require('../middleware/is-auth');

const Router = express.Router();

Router.get('/getAnnoucements', announcementContoller.getAnnoucements);

Router.get('/getAnnoucement/:annId', announcementContoller.getAnnoucement);

Router.get('/getUserAnnoucements/:userId', announcementContoller.getUserAnnoucements);

Router.put(
  '/addAnnoucement',
  isAuth,
  announcementValidation.validateAddAnnouncement,
  announcementContoller.addAnnoucement,
);

Router.patch('/updateAnnoucement');

Router.delete('/removeAnnoucement/:annId', isAuth, announcementContoller.removeAnnoucement);

Router.put('/addCategory', announcementContoller.addCategory);

module.exports = Router;
