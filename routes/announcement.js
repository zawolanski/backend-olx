const express = require('express');

const announcementContoller = require('../controllers/announcement');

const announcementValidation = require('../validation/announcementValidation');

const Router = express.Router();

Router.get('/getAnnoucements', announcementContoller.getAnnoucements);

Router.post('/getAnnoucement', announcementContoller.getAnnoucement);

Router.put(
  '/addAnnoucement',
  announcementValidation.validateAddAnnouncement,
  announcementContoller.addAnnoucement,
);

Router.patch('/updateAnnoucement');

Router.put('/addCategory', announcementContoller.addCategory);

Router.delete('/removeAnnoucement/:annId', announcementContoller.removeAnnoucement);

module.exports = Router;
