const bcrypt = require('bcrypt');

const User = require('../models/user');
const BadRequestError = require('../error-classes/BadRequestError');
const ConflictError = require('../error-classes/ConflictError');
const NotFoundError = require('../error-classes/NotFoundError');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      const { name, email } = user;
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.send({ name, email });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      res.send({ email, name });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при обновлении информации о пользователе'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    next(new BadRequestError('Поля: name, email или password не могут быть пустыми!'));
  }
  return User.findOne({ email }).then((user) => {
    if (user) {
      next(new ConflictError('Такой пользователь уже существует'));
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ email, password: hash, name }))
        .then((response) => res.status(201).send({ email: response.email, name: response.name }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Некорректные данные при создании пользователя'));
          } else {
            next(err);
          }
        });
    }
  });
};

module.exports = { getUser, updateUser, createUser };
