const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UnauthorizedError = require('../error-classes/UnauthorizedError');

const JWT_SECRET = process.env.JWT_SECRET || 'pee-pee-poo-poo';

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError('Пользователь с таким email не найден'));
      } else {
        bcrypt.compare(password, user.password, (error, result) => {
          if (result) {
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            return res.status(200).send({ token });
          }
          next(new UnauthorizedError('Введен неверный email или password'));
          return null;
        });
      }
    });
};
module.exports = { login };
