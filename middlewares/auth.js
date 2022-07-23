const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../error-classes/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = req.headers.authorization.split(' ')[1];
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
