const User = require('../models/user');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

exports.signUp = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 15);
    const user = new User({
      email,
      password: hashedPassword,
    });
    const doc = await user.save();
    if (doc && hashedPassword)
      res.status(201).json({
        message: 'Użytkownik utworzony pomyślnie!',
        success: true,
      });
    else {
      const error = new Error('Wystąpił błąd podczas rejestracji.');
      error.statusCode = 406;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('Użytkownik o podanym adresie email nie istnieje.');
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Niepoprawne hasło!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        user_id: user._id.toString(),
      },
      process.env.JWT_TOKEN,
      { expiresIn: '2h' },
    );

    res.status(201).json({
      message: 'Użytkownik zalogowany pomyślnie!',
      success: true,
      token,
      user_id: user._id.toString(),
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('Użytkownik nie istnieje.');
      error.statusCode = 401;
      throw error;
    }

    res.status(201).json({
      user: {
        email: user.email,
      },
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.addName = async (req, res, next) => {
  const userId = req.userId;
  const userName = req.body.username;

  console.log(req.body);

  let result;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('Użytkownik nie istnieje.');
      error.statusCode = 401;
      throw error;
    }

    if (userName !== undefined)
      result = await User.updateOne({ _id: userId }, { $set: { name: userName } });
    else {
      const error = new Error('Nie podano imienia.');
      error.statusCode = 401;
      throw error;
    }

    res.status(201).json({
      message: 'Imię zaktualizowane pomyślnie.',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
