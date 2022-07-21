const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../error-classes/UnauthorizedError');

const JWT_SECRET = process.env.JWT_SECRET || 'pee-pee-poo-poo';

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = req.headers.authorization.split(' ')[1];
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
