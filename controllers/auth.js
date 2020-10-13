const User = require('../models/user');
// const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');


exports.signUp = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 15);
        const user = new User({
            email, password: hashedPassword
        });
        const doc = await user.save()
        res.status(201).json({
            message: 'Użytkownik utworzony pomyślnie!',
            success: true,
        });
    } catch(error) {
        console.log(error)
    }
};
