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
    res.status(201).json({
      message: 'Użytkownik utworzony pomyślnie!',
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.signIn = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Użytkownik o podanym adresie email nie istnieje.');
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Niepoprawne hasło!');
    }

    const token = jwt.sign(
      {
        email: user.email,
        user_id: user._id.toString(),
      },
      'sebastianzawolanski',
      { expiresIn: '2h' },
    );

    res.status(201).json({
      message: 'Użytkownik zalogowany pomyślnie!',
      success: true,
      token,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
      success: false,
    });
  }
};
