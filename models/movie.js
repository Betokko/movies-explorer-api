const { Schema, model } = require('mongoose');
const validator = require('validator');

const movieSchema = new Schema({
  country: {
    type: String, required: true,
  },
  director: {
    type: String, required: true,
  },
  duration: {
    type: Number, required: true,
  },
  year: {
    type: String, required: true,
  },
  description: {
    type: String, required: true,
  },
  image: {
    type: String, required: true, validator: (v) => validator.isURL(v),
  },
  trailerLink: {
    type: String, required: true, validator: (v) => validator.isURL(v), default: 'https://youtu.be/dQw4w9WgXcQ',
  },
  thumbnail: {
    type: String, required: true, validator: (v) => validator.isURL(v),
  },
  owner: {
    type: Schema.Types.ObjectId, ref: 'user', required: true,
  },
  movieId: {
    type: Number, required: true,
  },
  nameRU: {
    type: String, required: true,
  },
  nameEN: {
    type: String, required: true,
  },
});

module.exports = model('movie', movieSchema);
