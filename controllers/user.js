const bcrypt = require('bcrypt');

const User = require('../models/user');
const BadRequestError = require('../error-classes/BadRequestError');
const ConflictError = require('../error-classes/ConflictError');

const getUser = (req, res) => {
  res.json('getUser');
};

const updateUser = (req, res) => {
  res.json('updateUser');
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
        .then((response) => res.status(200).send({ email: response.email, name: response.name }))
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
