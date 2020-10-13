const User = require('../models/user');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

exports.signUp = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcryp.hash(password, 15);
    const user = new User({
      email,
      password: hashedPassword,
    });
    const doc = await user.save();
    res.status(201).json({
      message: 'Użytkownik utworzony pomyślnie!',
      success: true,
    });
  } catch (error) {
    next('Wystąpił bład serwera!');
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
    });
  } catch (error) {
    next(error);
  }
};
