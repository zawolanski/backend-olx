const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');

const userRouter = require('./routes/auth');
const announcementRouter = require('./routes/announcement');

require('dotenv').config();

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toString() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(multer({ storage, fileFilter }).single('photo'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(userRouter);
app.use(announcementRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({
    message: message,
    success: false,
  });
});

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USER_PASS}@cluster0.hmz92.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.error(err);
    else {
      app.listen(process.env.PORT || 8080);
    }
  },
);
