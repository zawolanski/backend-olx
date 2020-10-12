const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/user');

const userRouter = require('./routes/auth');

require('dotenv').config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(userRouter);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USER_PASS}@cluster0.hmz92.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.error(err);
    else {
      //   const user = new User({
      //     email: 'sebastol90@wp.pl',
      //     password: '1234',
      //   });
      //   user.save();
      app.listen(process.env.PORT || 8080);
    }
  },
);
