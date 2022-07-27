const validator = require('validator');

const validateURL = (url) => {
  if (!validator.isURL(url, { require_protocol: true })) {
    throw new Error('Неправильный формат ссыки');
  }
  return url;
};

module.exports = validateURL;
