const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
  user: {
    type: String, required: true, unique: true, validator: (v) => validator.isEmail(v),
  },
  password: {
    type: String, required: true, select: false,
  },
  name: {
    type: String, required: true, minlength: 2, maxlength: 30,
  },
});

module.exports = model('user', userSchema);
